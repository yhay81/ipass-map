[CmdletBinding()]
param(
    [switch]$Local
)

$ErrorActionPreference = "Stop"
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$SqlPath = Join-Path $PSScriptRoot "product-metrics.sql"
$Wrangler = Join-Path $RepoRoot "node_modules\.bin\wrangler.cmd"
$Target = if ($Local) { "--local" } else { "--remote" }
$Sql = (Get-Content $SqlPath) -join " "

$Output = & $Wrangler d1 execute ipass-map $Target --json --command $Sql
if ($LASTEXITCODE -ne 0) {
    throw "D1 metrics query failed with exit code $LASTEXITCODE"
}

$Payload = ($Output -join [Environment]::NewLine) | ConvertFrom-Json
$Row = $Payload[0].results[0]
if (-not $Row) {
    throw "D1 metrics query returned no result"
}

function Get-Percent {
    param([int]$Numerator, [int]$Denominator)
    if ($Denominator -eq 0) { return $null }
    return [Math]::Round(($Numerator / $Denominator) * 100, 1)
}

$Users = [int]$Row.users
$Starters = [int]$Row.starters
$Completers = [int]$Row.completers
$CompletedQuestions = [int]$Row.completed_questions

[ordered]@{
    generated_at = (Get-Date).ToUniversalTime().ToString("o")
    service = "ipass-map"
    environment = if ($Local) { "local" } else { "production" }
    funnel = [ordered]@{
        users = $Users
        starters = $Starters
        completers = $Completers
        answers = [int]$Row.answers
        drill_users = [int]$Row.drill_users
        official_visitors = [int]$Row.official_visitors
        returned_users = [int]$Row.returned_users
        users_7d = [int]$Row.users_7d
        completers_7d = [int]$Row.completers_7d
    }
    rates = [ordered]@{
        visitor_to_start_percent = Get-Percent $Starters $Users
        start_to_complete_percent = Get-Percent $Completers $Starters
        complete_to_drill_percent = Get-Percent ([int]$Row.drill_users) $Completers
        complete_to_official_percent = Get-Percent ([int]$Row.official_visitors) $Completers
        return_percent = Get-Percent ([int]$Row.returned_users) $Users
        average_completed_score_percent = Get-Percent ([int]$Row.completed_score) $CompletedQuestions
    }
} | ConvertTo-Json -Depth 4
