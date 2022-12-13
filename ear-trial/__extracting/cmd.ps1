$files = Get-ChildItem -Directory
foreach ($file in $files) {
	$dirPath = $file.FullName;
	$sounds = Get-ChildItem $file
	foreach ($sound in $sounds) {
		$outputName = "$($dirPath)/CONVERTED_$($sound.Name)"
		ffmpeg -i $sound.FullName -af "asetrate=11025" $outputName
	}
}

$files = Get-ChildItem -Directory
foreach ($file in $files) {
	$dirPath = $file.FullName;
	$sounds = Get-ChildItem $file;
	Set-Location $dirpath;
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [1].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [2].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [3].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [4].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [5].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [6].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [7].wav"

	Rename-Item "CONVERTED_ptp_btl_bgm_voice [8].wav" "march-1.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [9].wav" "attack-1.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [10].wav" "defend-1.wav"

	Remove-Item "CONVERTED_ptp_btl_bgm_voice [11].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [12].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [13].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [14].wav"

	Rename-Item "CONVERTED_ptp_btl_bgm_voice [15].wav" "march-2.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [16].wav" "attack-2.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [17].wav" "defend-2.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [18].wav" "march-3.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [19].wav" "attack-3.wav"
	Rename-Item "CONVERTED_ptp_btl_bgm_voice [20].wav" "defend-3.wav"

	Remove-Item "CONVERTED_ptp_btl_bgm_voice [21].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [22].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [23].wav"
	Remove-Item "CONVERTED_ptp_btl_bgm_voice [24].wav"
}