include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");

camAreaEvent("NASDAO", function(droid)
{
	hackAddMessage("C1L2_OBJ", PROX_MSG, CAM_HUMAN_PLAYER, false);
});

camAreaEvent("NASDA", function(droid)
{
	DefendNASDA();
});

camAreaEvent("NASDAZ", function(droid)
{
	if (enumArea("NASDA", CAM_HUMAN_PLAYER, false).length === 0)
	{
		resetFactories();
		resetLabel("NASDA");
	}
	resetLabel("NASDAZ")
});

camAreaEvent("CAPTURE", function(droid)
{
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
});

camAreaEvent("crudet", function(droid)
{
	hackAddMessage("C1L2_OBJ6", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("crutran", function(droid)
{
	hackRemoveMessage("C1L2_OBJ6", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,544), CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,546), CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,549), CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,550), CAM_HUMAN_PLAYER);
	playSound("pcv611.ogg");
});

camAreaEvent("asdet1", function(droid)
{
	hackAddMessage("C1L2_OBJ7", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("astran1", function(droid)
{
	hackRemoveMessage("C1L2_OBJ7", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,539), CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,540), CAM_HUMAN_PLAYER);
	playSound("pcv611.ogg");
});

camAreaEvent("asdet2", function(droid)
{
	hackAddMessage("C1L2_OBJ8", PROX_MSG, CAM_HUMAN_PLAYER, false);
	playSound("pcv448.ogg");
});

camAreaEvent("astran2", function(droid)
{
	hackRemoveMessage("C1L2_OBJ8", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,542), CAM_HUMAN_PLAYER);
	donateObject(getObject(STRUCTURE,8,541), CAM_HUMAN_PLAYER);
	playSound("pcv611.ogg");
});

function resetFactories()
{
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
			groupSize: 12,
			maxSize: 24,
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
	enableFactories()
}

function DefendNASDA()
{
	camSetFactories({
		"ScavFac0": {
			assembly: "Assembly0",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 20 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 8)),
			templates: [ cTempl.blokerpg ]
		},
		"ScavFac1": {
			assembly: "Assembly1",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 20 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 18 : 14)),
			templates: [ cTempl.bjeepheavy, cTempl.rbjeep, cTempl.bjeepheavy, cTempl.buscan, cTempl.bjeepheavy, cTempl.firetruck ]
		},
		"ScavFac2": {
			assembly: "Assembly2",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 20 },
			groupSize: 4,
			maxSize: 8,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 14 : 10)),
			templates: [ cTempl.rbjeep ]
		},
	});
	enableFactories()
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

function isNASDAcaptured()
{
	if (enumStruct(8,STRUCTURE,false).length === 0)
	{
		return true;
		hackRemoveMessage("C1L2_OBJ", PROX_MSG, CAM_HUMAN_PLAYER);
		playSound("pcv626.ogg");
	}
}
function enableFactories()
{
	camEnableFactory("ScavFac0");
	camEnableFactory("ScavFac1");
	camEnableFactory("ScavFac2");
}

changePlayerColour(CAM_HUMAN_PLAYER, 5);

function eventStartLevel()
{
	var startpos = getObject("PlayerBase");
	var lz = getObject("LandingZone");

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "C1L3", {
		callback: "isNASDAcaptured",
	});
	

	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	
	setAlliance(8, 9, true);
	setAlliance(CAM_HUMAN_PLAYER, 8, true);
	setAlliance(7, 8, true);
	setAlliance(7, 9, true);
	changePlayerColour(8, 10);
	changePlayerColour(9, 10);

	// Give player briefing.
	
	camPlayVideos({video: "C1L2_MSG", type: MISS_MSG});
	if (difficulty === HARD)
	{
		setMissionTime(camMinutesToSeconds(90));
	}
	else if (difficulty === INSANE)
	{
		setMissionTime(camMinutesToSeconds(60));
	}
	else
	{
		setMissionTime(camHoursToSeconds(2));
	}

	camSetArtifacts({
		"ccarti": { tech: "R-Struc-CommandCenter" },
		"pgenarti": { tech: [ "R-Struc-PowerGenerator", "R-Struc-PowerModuleMk1" ]},
		"facarti": { tech: [ "R-Struc-Factory-Light", "R-Wpn-MG1Mk1", "R-Vehicle-Prop-Wheels", 
		"R-Vehicle-BodyA01", "R-Struc-Factory-Module", "R-Sys-MobileRepairTurret01", 
		"R-Sys-Sensor-Turret01", "R-Wpn-Flamer01Mk1" ]},
		"resarti": { tech: [ "R-Struc-ResearchFacility", "R-Struc-Research-Module" ]},
		"crarti": { tech: "R-Struc-CommandRelay" },
		"preqres1": { tech: [ "R-Sys-Sensor-Tower01", "R-Defense-Tower01" ]},
		"cyfacarti": { tech: "R-Struc-Factory-Cyborg" },
		"reparti": { tech: "R-Struc-RepairFacility" },
		"preqres2": { tech: [ "R-Sys-Engineering01", "R-Wpn-Flamer-ROF01", "R-Wpn-Flamer-Damage01" ]},
		"preqres3": { tech: [ "R-Wpn-MG-Damage01", "R-Wpn-MG-ROF01" ]},
		"gatearti": { tech: "R-Defense-HardcreteGate" },
		"wallarti": { tech: "R-Defense-HardcreteWall" },
		"traparti": { tech: "R-Defense-TankTrap01" },
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
	enableFactories()
}
