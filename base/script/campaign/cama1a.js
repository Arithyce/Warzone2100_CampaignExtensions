include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");

const SCAVENGER_RES = [
	"R-Wpn-MG-Damage01", "R-Wpn-MG-ROF01",
];

makeComponentAvailable("B1BaBaPerson01", CAM_HUMAN_PLAYER)
makeComponentAvailable("B4body-sml-trike01", CAM_HUMAN_PLAYER)
makeComponentAvailable("B3body-sml-buggy01", CAM_HUMAN_PLAYER)
makeComponentAvailable("B2JeepBody", CAM_HUMAN_PLAYER)
makeComponentAvailable("B2RKJeepBody", CAM_HUMAN_PLAYER)
makeComponentAvailable("B3bodyRKbuggy01", CAM_HUMAN_PLAYER)
makeComponentAvailable("BusBody", CAM_HUMAN_PLAYER)
makeComponentAvailable("FireBody", CAM_HUMAN_PLAYER)
makeComponentAvailable("BaBaLegs", CAM_HUMAN_PLAYER)
makeComponentAvailable("BaBaProp", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaMG", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaTrikeMG", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaBuggyMG", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaJeepMG", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaRocket", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaBusCannon", CAM_HUMAN_PLAYER)
makeComponentAvailable("BabaFlame", CAM_HUMAN_PLAYER)
makeComponentAvailable("B2crane", CAM_HUMAN_PLAYER)
makeComponentAvailable("scavCrane", CAM_HUMAN_PLAYER)

makeComponentAvailable("B1BaBaPerson01", SCAV_7)
makeComponentAvailable("B4body-sml-trike01", SCAV_7)
makeComponentAvailable("B3body-sml-buggy01", SCAV_7)
makeComponentAvailable("B2JeepBody", SCAV_7)
makeComponentAvailable("B2RKJeepBody", SCAV_7)
makeComponentAvailable("B3bodyRKbuggy01", SCAV_7)
makeComponentAvailable("BusBody", SCAV_7)
makeComponentAvailable("FireBody", SCAV_7)
makeComponentAvailable("BaBaLegs", SCAV_7)
makeComponentAvailable("BaBaProp", SCAV_7)
makeComponentAvailable("BabaMG", SCAV_7)
makeComponentAvailable("BabaTrikeMG", SCAV_7)
makeComponentAvailable("BabaBuggyMG", SCAV_7)
makeComponentAvailable("BabaJeepMG", SCAV_7)
makeComponentAvailable("BabaRocket", SCAV_7)
makeComponentAvailable("BabaBusCannon", SCAV_7)
makeComponentAvailable("BabaFlame", SCAV_7)
makeComponentAvailable("B2crane", SCAV_7)
makeComponentAvailable("scavCrane", SCAV_7)

function camEnemyBaseEliminated_scavGroup1()
{
	camEnableFactory("ScavFac");
	camPlayVideos(["pcv456.ogg", {video: "MBA1A_MSG", type: MISS_MSG}]);
}

function camEnemyBaseEliminated_scavGroup2()
{
	camPlayVideos({video: "MBA1A1_MSG", type: MISS_MSG});
	const StructArti = [
		"A0BaBaFlameTower", "A0CannonTower",
	];
		
	const TempleArti = [
		"BaBaPeople", "BabaBusCan",
		"BabaFireCan", "BabaFireTruck",
	];
		
	for (let s = 0; s < StructArti.length; ++s)
	{
		enableStructure(StructArti[s], CAM_HUMAN_PLAYER);
	};
	
	for (let t = 0; t < TempleArti.length; ++t)
	{
		enableTemplate(TempleArti[t]);
	}
}

function enableBaseStructures()
{
	const STRUCTS = [
		"A0BaBaPowerGenerator", "A0ResourceExtractor",
		"A0BaBaFactory", "A0BaBaGunTower", "A0BaBaGunTowerEND",
		"A0BaBaHorizontalWall", "A0BabaCornerWall", "LookOutTower",
	];

	for (let i = 0; i < STRUCTS.length; ++i)
	{
		enableStructure(STRUCTS[i], CAM_HUMAN_PLAYER);
	}
}

function enableStartTemplates()
{
	const TEMPLS = [
		"BabaCrane", "BabaJeep",
		"BarbarianBuggy", "BarbarianTrike",
	];

	for (let i = 0; i < TEMPLS.length; ++i)
	{
		enableTemplate(TEMPLS[i]);
	}
}

changePlayerColour(CAM_HUMAN_PLAYER, 5)

function eventStartLevel()
{
	const PLAYER_POWER = 0;
	var startpos = getObject("start");

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "CAM_OUT");

	centreView(startpos.x, startpos.y);

	if (difficulty === HARD)
	{
		setPower(0, CAM_HUMAN_PLAYER);
	}
	else if (difficulty === INSANE)
	{
		setPower(0, CAM_HUMAN_PLAYER);
	}
	else
	{
		setPower(PLAYER_POWER, CAM_HUMAN_PLAYER);
	}

	enableBaseStructures();
	enableStartTemplates();
	camCompleteRequiredResearch(SCAVENGER_RES, 7);

	// Give player briefing.
	
	camPlayVideos({video: "CMBA1_MSG", type: CAMP_MSG, immediate: false});
	if (difficulty === HARD)
	{
		setMissionTime(camMinutesToSeconds(45));
	}
	else if (difficulty === INSANE)
	{
		setMissionTime(camMinutesToSeconds(30));
	}
	else
	{
		setMissionTime(camHoursToSeconds(1));
	}

	
	// Feed libcampaign.js with data to do the rest.
	camSetEnemyBases({
		"scavGroup1": {
			cleanup: "PlayerBase1",
			detectMsg: "CA1A_POST0",
			detectSnd: "pcv375.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"scavGroup2": {
			cleanup: "ScavBase",
			detectMsg: "CA1A_BASE0",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
	});

	camMakeGroup("Group")

	camSetFactories({
		"ScavFac": {
			assembly: "Assembly",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlaBasAtt1" },
			groupSize: 8,
			maxSize: 16,
			group: { group: "Group" },
			templates: [
			cTempl.bloke, cTempl.trike, cTempl.buggy, cTempl.bjeep,
			cTempl.buscan, cTempl.firecan, cTempl.firetruck ]
		},
	});
}
