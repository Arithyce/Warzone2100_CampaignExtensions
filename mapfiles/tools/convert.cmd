mkdir "C:\Storage\Games & Apps\Warzone2100-MT\Output\map"
cd "C:\Storage\Games & Apps\Warzone2100-MT"
maptools map convert -t campaign -p 8 -f latest -i "C:\Storage\Games & Apps\Warzone2100-MT\Input\map" -o "C:\Storage\Games & Apps\Warzone2100-MT\Output\map"
pause
move "C:\Storage\Games & Apps\Warzone2100-MT\Input\map.gam" "C:\Storage\Games & Apps\Warzone2100-MT\Output"
pause
python "C:\Storage\Games & Apps\Warzone2100-MT\ini2json.py" labels.ini
pause
cd "C:\Storage\Games & Apps\Warzone2100-MT\Input"
rmdir /S /Q "C:\Storage\Games & Apps\Warzone2100-MT\Input"
exit