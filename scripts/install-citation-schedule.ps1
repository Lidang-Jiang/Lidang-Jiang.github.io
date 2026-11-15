param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Za-z0-9_.-]+$')]
    [string]$Distro,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[a-z_][a-z0-9_-]*$')]
    [string]$LinuxUser,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^/[A-Za-z0-9/_.-]+$')]
    [string]$WslScript
)

$ErrorActionPreference = 'Stop'
$taskName = 'LidangWebsite-GoogleScholar-Weekly'

# 不覆盖已有同名任务，避免接管其他会话的配置。
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    throw "Task already exists: $taskName"
}

$userId = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$action = New-ScheduledTaskAction `
    -Execute "$env:WINDIR\System32\wsl.exe" `
    -Argument "--distribution $Distro --user $LinuxUser --exec /bin/bash $WslScript" `
    -WorkingDirectory "$env:WINDIR\System32"
$trigger = New-ScheduledTaskTrigger -Weekly -WeeksInterval 1 -DaysOfWeek Monday -At '09:00'
$principal = New-ScheduledTaskPrincipal -UserId $userId -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet `
    -StartWhenAvailable `
    -MultipleInstances IgnoreNew `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

# 任务沿用当前 Windows 登录，不保存密码；关机错过时在条件允许后补跑。
Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Description '每周更新个人网站 Google Scholar 论文引用次数' |
    Select-Object TaskName, State

Get-ScheduledTaskInfo -TaskName $taskName |
    Select-Object LastRunTime, LastTaskResult, NextRunTime
