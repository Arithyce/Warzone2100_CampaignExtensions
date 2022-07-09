include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");

function eventChat(from, to, message)
{
	switch (message)
	{
		case "techa":
			enableStructure("A0BaBaFlameTower", CAM_HUMAN_PLAYER);
			enableStructure("A0CannonTower", CAM_HUMAN_PLAYER);
			makeComponentAvailable("BabaFlame", CAM_HUMAN_PLAYER);
			makeComponentAvailable("BabaBusCannon", CAM_HUMAN_PLAYER);
			makeComponentAvailable("FireBody", CAM_HUMAN_PLAYER);
			makeComponentAvailable("BusBody", CAM_HUMAN_PLAYER);
			camCompleteRequiredResearch([ "R-Wpn-BMG2", "R-Wpn-JMG2", "R-Wpn-TMG2", "R-Wpn-BAMG2"], CAM_HUMAN_PLAYER );
			break;
		case "techo":
			enableStructure("A0BaBaFlameTower", CAM_HUMAN_PLAYER);
			enableStructure("A0CannonTower", CAM_HUMAN_PLAYER);
			makeComponentAvailable("BabaFlame", CAM_HUMAN_PLAYER);
			makeComponentAvailable("BabaBusCannon", CAM_HUMAN_PLAYER);
			makeComponentAvailable("FireBody", CAM_HUMAN_PLAYER);
			makeComponentAvailable("BusBody", CAM_HUMAN_PLAYER);
			camCompleteRequiredResearch([ "R-Wpn-BMG2", "R-Wpn-JMG2", "R-Wpn-TMG2", "R-Wpn-BAMG2"], CAM_HUMAN_PLAYER );
			setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
			loadLevel("cama1b");
			break;
		default:
			return;
	}
}

function builtDerrick()
{
	camManageGroup(camMakeGroup("GroupA", ENEMIES), CAM_ORDER_ATTACK, {
		pos: "PlaBasAtt1"
		});
		camEnableFactory("ScavFac");
		camPlayVideos({video: "MBA1A_MSG", type: MISS_MSG});
}

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
				camCallOnce("builtDerrick");
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
	enableStructure("A0BaBaFlameTower", CAM_HUMAN_PLAYER);
	enableStructure("A0CannonTower", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaFlame", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaBusCannon", CAM_HUMAN_PLAYER);
	makeComponentAvailable("FireBody", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BusBody", CAM_HUMAN_PLAYER);
	camCompleteRequiredResearch([ "R-Wpn-BMG2", "R-Wpn-JMG2", "R-Wpn-TMG2", "R-Wpn-BAMG2"], CAM_HUMAN_PLAYER );
}

function enableBaseStructures()
{
	enableStructure("A0BaBaPowerGenerator", CAM_HUMAN_PLAYER);
	enableStructure("A0ResourceExtractor", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaFactory", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaGunTower", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaGunTowerEND", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaHorizontalWall", CAM_HUMAN_PLAYER);
	enableStructure("A0BabaCornerWall", CAM_HUMAN_PLAYER);
	enableStructure("LookOutTower", CAM_HUMAN_PLAYER);
}

function enableStartComponents()
{
	makeComponentAvailable("B4body-sml-trike01", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B3body-sml-buggy01", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B2JeepBody", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BaBaProp", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaTrikeMG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaBuggyMG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaJeepMG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B2crane", CAM_HUMAN_PLAYER);
	makeComponentAvailable("scavCrane", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaMG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BaBaLegs", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B1BaBaPerson01", CAM_HUMAN_PLAYER);
}

changePlayerColour(CAM_HUMAN_PLAYER, 5);

function eventStartLevel()
{
	var startpos = getObject("start");

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "CAM_A1B");

	centreView(startpos.x, startpos.y);

	setPower(0, CAM_HUMAN_PLAYER);

	enableBaseStructures();
	enableStartComponents();
	
	camUpgradeOnMapTemplates(cTempl.bloke, cTempl.bloketwin, 7);
	camUpgradeOnMapTemplates(cTempl.trike, cTempl.triketwin, 7);
	camUpgradeOnMapTemplates(cTempl.buggy, cTempl.buggytwin, 7);
	camUpgradeOnMapTemplates(cTempl.bjeep, cTempl.bjeeptwin, 7);

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
			groupSize: 7,
			maxSize: 14,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 18 : 14)),
			templates: [
			cTempl.bloketwin, cTempl.triketwin, cTempl.buggytwin, cTempl.bjeeptwin,
			cTempl.buscan, cTempl.firecan, cTempl.firetruck ]
		},
		"ScavFac0": {
			assembly: "Assembly0",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlaBasAtt1" },
			groupSize: 6,
			maxSize: 12,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 4 : 2)),
			templates: [ cTempl.bloketwin ]
		},
	});
}
