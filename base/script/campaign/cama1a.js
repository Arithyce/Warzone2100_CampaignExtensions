include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");

function eventStructureBuilt(structure, droid)
{
	if (structure.player === CAM_HUMAN_PLAYER && structure.stattype === RESOURCE_EXTRACTOR)
	{
		var objs = enumArea("PlayerBase", CAM_HUMAN_PLAYER);
		for (var d = 0, o = objs.length; d < o; ++d)
		{
			var obj = objs[d];
			if (obj.type === STRUCTURE && obj.stattype === RESOURCE_EXTRACTOR)
			{
				camManageGroup(camMakeGroup("GroupA", ENEMIES), CAM_ORDER_ATTACK, {
					pos: "PlaBasAtt1"
				});
				camEnableFactory("ScavFac");
				camPlayVideos({video: "MBA1A_MSG", type: MISS_MSG});
				break;
			}
		}
	}
}

camAreaEvent("ScoutMSG", function(droid)
{
	camPlayVideos({video: "MBA1A_MSG3", type: MISS_MSG});
	
	if (difficulty !== HARD && difficulty !== INSANE)
	{
		setMissionTime(camChangeOnDiff(camHoursToSeconds(1)));
	}
});



function camEnemyBaseEliminated_scavGroup1()
{
	camEnableFactory("ScavFac0");
	camPlayVideos({video: "MBA1A_MSG4", type: MISS_MSG});
}

function camEnemyBaseEliminated_scavGroup0()
{
	camPlayVideos({video: "MBA1A_MSG2", type: MISS_MSG});
	const StructArti = [
		"A0BaBaFlameTower", "A0CannonTower",
	];
	
	for (let s = 0; s < StructArti.length; ++s)
	{
		enableStructure(StructArti[s], CAM_HUMAN_PLAYER);
	};
	makeComponentAvailable("BabaFlame", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaBusCannon", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaMG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BaBaLegs", CAM_HUMAN_PLAYER);
	makeComponentAvailable("FireBody", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BusBody", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B1BaBaPerson01", CAM_HUMAN_PLAYER);
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

function enableStartComponents()
{
	makeComponentAvailable("B4body-sml-trike01", CAM_HUMAN_PLAYER)
	makeComponentAvailable("B3body-sml-buggy01", CAM_HUMAN_PLAYER)
	makeComponentAvailable("B2JeepBody", CAM_HUMAN_PLAYER)
	makeComponentAvailable("BaBaProp", CAM_HUMAN_PLAYER)
	makeComponentAvailable("BabaTrikeMG", CAM_HUMAN_PLAYER)
	makeComponentAvailable("BabaBuggyMG", CAM_HUMAN_PLAYER)
	makeComponentAvailable("BabaJeepMG", CAM_HUMAN_PLAYER)
	makeComponentAvailable("B2crane", CAM_HUMAN_PLAYER)
	makeComponentAvailable("scavCrane", CAM_HUMAN_PLAYER)
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
	enableStartComponents();

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
		setMissionTime(-1);
	}

	
	// Feed libcampaign.js with data to do the rest.
	camSetEnemyBases({
		"scavGroup1": {
			cleanup: "PlayerBase",
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
		"scavGroup0": {
			cleanup: "ScavBase0",
			detectMsg: "CA1A_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
	});

	camSetFactories({
		"ScavFac": {
			assembly: "Assembly",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlaBasAtt1" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 16 : 12)),
			templates: [
			cTempl.bloke, cTempl.trike, cTempl.buggy, cTempl.bjeep,
			cTempl.buscan, cTempl.firecan, cTempl.firetruck ]
		},
		"ScavFac0": {
			assembly: "Assembly0",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlaBasAtt1" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 4 : 2)),
			templates: [ cTempl.bloke ]
		},
	});
}
