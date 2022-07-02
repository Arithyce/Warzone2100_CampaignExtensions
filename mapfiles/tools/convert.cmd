mkdir "C:\Storage\Games & Apps\Warzone2100-MT\Output\map"
cd "C:\Storage\Games & Apps\Warzone2100-MT"
maptools map convert -t campaign -p 8 -f latest -i "C:\Storage\Games & Apps\Warzone2100-MT\Input\map" -o "C:\Storage\Games & Apps\Warzone2100-MT\Output\map"
timeout /t 5 /nobreak
move "C:\Storage\Games & Apps\Warzone2100-MT\Input\map.gam" "C:\Storage\Games & Apps\Warzone2100-MT\Output"
cd "C:\Storage\Games & Apps\Warzone2100-MT\Input"
rmdir /S /Q "C:\Storage\Games & Apps\Warzone2100-MT\Input"
exit
