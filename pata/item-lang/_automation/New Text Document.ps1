Get-ChildItem * | ForEach-Object {
 $name = $_.Name
 $path = $_.FullName
 $txtDir = gci -path $path -recurse -filter "txt" -directory
 if($txtDir -eq $null) {
    return
 }
 $destDir = mkdir "..\data\"+$name.substring(1)

   foreach($x in @("itemmsg.msg.txt", "systemmsg.msg.txt", "unitnamemsg.msg.txt")) {
      cp (join-path $txtDir[0].FullName $x) (join-path $destDir $x)
   }
}