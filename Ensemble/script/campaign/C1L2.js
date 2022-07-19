include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");

var UPZ = 0;
var RSZ = 0;
var OLZ = 0;
var UPLZD = 0;
var UPLZ = 0;
var IFRESZD = 0;
var IFRESZ = 0;

camAreaEvent("NASDAZ", function(droid)
{
	camSetFactories({
		"ScavFac0": {
			assembly: "Assembly0",
			order: CAM_ORDER_ATTACK,
			data: { pos: "DefendZ" },
			groupSize: 12,
			maxSize: 24,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 8 : 6)),
			templates: [ cTempl.blokerpg ]
		},
		"ScavFac1": {
			assembly: "Assembly1",
			order: CAM_ORDER_ATTACK,
			data: { pos: "DefendZ" },
			groupSize: 12,
			maxSize: 24,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 14 : 10)),
			templates: [ cTempl.bjeepheavy, cTempl.rbjeep, cTempl.bjeepheavy, cTempl.buscan, cTempl.bjeepheavy, cTempl.firetruck ]
		},
		"ScavFac2": {
			assembly: "Assembly2",
			order: CAM_ORDER_ATTACK,
			data: { pos: "DefendZ" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 12 : 8)),
			templates: [ cTempl.rbjeep ]
		},
	});
	enableFactories();
});

camAreaEvent("CAPTURE", function(droid)
{
	hackAddMessage("C1L2_OBJ", PROX_MSG, CAM_HUMAN_PLAYER, false);
	camPlayVideos(["pcv448.ogg", {video: "C1L2_MSG2", type: MISS_MSG}]);
	camSetExtraObjectiveMessage(_("Capture all functional NASDA structures"));
});

camAreaEvent("resdet", function(droid)
{
	hackAddMessage("C1L2_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("restran", function(droid)
{
	hackRemoveMessage("C1L2_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,382), CAM_HUMAN_PLAYER);
	playSound("pcv611.ogg");
	queue("RSCAPZ");
});

camAreaEvent("upldet", function(droid)
{
	hackAddMessage("C1L2_OBJ2", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("upltran", function(droid)
{
	hackRemoveMessage("C1L2_OBJ2", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,537), CAM_HUMAN_PLAYER);
	playSound("pcv611.ogg");
	queue("UPCAPZ");
});

camAreaEvent("derdet1", function(droid)
{
	hackAddMessage("C1L2_OBJ3", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("dertran1", function(droid)
{
	hackRemoveMessage("C1L2_OBJ3", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,534), CAM_HUMAN_PLAYER);
	setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
	playSound("power-transferred.ogg");
	queue("OLCAPZ");
});

camAreaEvent("derdet2", function(droid)
{
	hackAddMessage("C1L2_OBJ4", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("dertran2", function(droid)
{
	hackRemoveMessage("C1L2_OBJ4", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,536), CAM_HUMAN_PLAYER);
	setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
	playSound("power-transferred.ogg");
	queue("OLCAPZ");
});

camAreaEvent("derdet3", function(droid)
{
	hackAddMessage("C1L2_OBJ5", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("dertran3", function(droid)
{
	hackRemoveMessage("C1L2_OBJ5", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,535), CAM_HUMAN_PLAYER);
	setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
	playSound("power-transferred.ogg");
	queue("OLCAPZ");
});

function UPCAPZ()
{
	++UPZ;
}

function RSCAPZ()
{
	++RSZ;
}

function OLCAPZ()
{
	++OLZ;
}

function victoryIs()
{
	if (RSZ === 1 && UPZ === 1)
	{
		dump("RENA");
		IFRESZ = (enumStruct(CAM_HUMAN_PLAYER,RESEARCH_LAB,false).length);
		IFRESZD = String(IFRESZ);
		dump("IFRESZ =",IFRESZD);
		if (IFRESZ === 0 || IFRESZ === null)
		{
			dump("IFRES");
			if (!isStructureAvailable("A0ResearchFacility",CAM_HUMAN_PLAYER))
			{
				dump("RESAV");
				gameOverMessage(false);
				return;
			}
		}
		UPLZ = (enumStruct(CAM_HUMAN_PLAYER,SAT_UPLINK,false).length);
		UPLZD = String(UPLZ);
		dump("UPLZ =",UPLZD);
		if (UPLZ === 0 || UPLZ === null)
		{
			dump("UPLZ");
			gameOverMessage(false);
			return;
		}
	}
}

function camEnemyBaseEliminated_scavGroup0()
{
	camPlayVideos({video: "C1L2_MSG1", type: MISS_MSG});
	makeComponentAvailable("BabaRPG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaRocket", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B2RKJeepBody", CAM_HUMAN_PLAYER);
	makeComponentAvailable("B3bodyRKbuggy01", CAM_HUMAN_PLAYER);
	camCompleteRequiredResearch([ "R-Wpn-BMG3", "R-Wpn-JMG3", "R-Wpn-TMG3", "R-Wpn-BAMG3"], CAM_HUMAN_PLAYER );
	enableStructure("A0BaBaBunker", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaMortarPit", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaRocketPit", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaRocketPitAT", CAM_HUMAN_PLAYER);
}

function objectivez()
{
	dump("OBJECTIVE");
	hackRemoveMessage("C1L2_OBJ", PROX_MSG, CAM_HUMAN_PLAYER);
	playSound("pcv626.ogg");
	camSetExtraObjectiveMessage(_("The Satellite Uplink Center must remain intact"));
}

function isNASDAcaptured()
{
	if (OLZ === 3 && RSZ === 1 && UPZ === 1)
	{
		camCallOnce("objectivez");
		dump("ISNASCAP");
		return true;
	}
}
function enableFactories()
{
	camEnableFactory("ScavFac0");
	camEnableFactory("ScavFac1");
	camEnableFactory("ScavFac2");
}

changePlayerColour(CAM_HUMAN_PLAYER, 5);
changePlayerColour(7, 8);
changePlayerColour(8, 10);
changePlayerColour(9, 10);

function eventStartLevel()
{
	var startpos = getObject("PlayerBase");
	var lz = getObject("LandingZone");

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "C1L3", {
		callback: "isNASDAcaptured"
	});
	

	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	
	setAlliance(8, 9, true);
	setAlliance(CAM_HUMAN_PLAYER, 8, true);
	setAlliance(7, 8, true);
	setAlliance(7, 9, true);
	
	setTimer("victoryIs", 5000);

	// Give player briefing.
	
	camPlayVideos({video: "C1L2_MSG", type: MISS_MSG});
	if (difficulty === HARD)
	{
		setMissionTime(camMinutesToSeconds(90));
	}
	else if (difficulty === INSANE)
	{
		setMissionTime(camHoursToSeconds(1));
	}
	else
	{
		setMissionTime(camHoursToSeconds(2));
	}

	camSetArtifacts({
		"ccarti": { tech: "R-Struc-CommandCenter" },
		"pgenarti": { tech: "R-Struc-PowerGenerator" },
		"facarti": { tech: "R-Struc-Factory-Light" },
		"resarti": { tech: "R-Struc-ResearchFacility" },
		"crarti": { tech: "R-Struc-CommandRelay" },
		"preqres1": { tech: "R-Sys-Engineering01" },
		"cyfacarti": { tech: "R-Comp-SynapticLink" },
		"reparti": { tech: "R-Struc-RepairFacility" },
		"preqres2": { tech: "R-Defense-HardcreteGate" },
		"preqres3": { tech: "R-Defense-HardcreteWall" }
	});
	
	// Feed libcampaign.js with data to do the rest.
	camSetEnemyBases({
		"scavGroup": {
			cleanup: "ScavPost0",
			detectMsg: "C1L2_POST0",
			detectSnd: "pcv375.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"scavGroup0": {
			cleanup: "ScavBase0",
			detectMsg: "C1L2_BASE0",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"scavGroup1": {
			cleanup: "ScavBase1",
			detectMsg: "C1L2_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"scavGroup2": {
			cleanup: "ScavBase2",
			detectMsg: "C1L2_BASE2",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
	});

	camSetFactories({
		"ScavFac0": {
			assembly: "Assembly0",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlayerBase" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 8)),
			templates: [ cTempl.blokerpg ]
		},
		"ScavFac1": {
			assembly: "Assembly1",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlayerBase" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 18 : 14)),
			templates: [ cTempl.bjeepheavy, cTempl.rbjeep, cTempl.bjeepheavy, cTempl.buscan, cTempl.bjeepheavy, cTempl.firetruck ]
		},
		"ScavFac2": {
			assembly: "Assembly2",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlayerHill" },
			groupSize: 4,
			maxSize: 8,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 14 : 10)),
			templates: [ cTempl.rbjeep ]
		},
	});
	enableFactories();
}
