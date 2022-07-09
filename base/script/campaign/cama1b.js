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
		default:
			return;
	}
}

camAreaEvent("NASDAO", function(droid)
{
	hackAddMessage("CBA1B_OBJ", PROX_MSG, CAM_HUMAN_PLAYER, false);
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
	camPlayVideos({video: "MBA1B_MSG2", type: MISS_MSG});
	hackAddMessage("CBA1B_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);
	camSetExtraObjectiveMessage(_("Capture all capturable NASDA structures"));
});

camAreaEvent("restran", function(droid)
{
	hackRemoveMessage("CBA1B_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
	donateObject(366, CAM_HUMAN_PLAYER);
});

camAreaEvent("dertran1", function(droid)
{
	donateObject(3, CAM_HUMAN_PLAYER);
	setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
	playSound("power-transferred.ogg");
});

camAreaEvent("dertran2", function(droid)
{
	donateObject(4, CAM_HUMAN_PLAYER);
	setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
	playSound("power-transferred.ogg");
});

camAreaEvent("dertran3", function(droid)
{
	donateObject(5, CAM_HUMAN_PLAYER);
	setPower(playerPower(CAM_HUMAN_PLAYER) + 1000);
	playSound("power-transferred.ogg");
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 6 : 4)),
			templates: [ cTempl.blokerpg ]
		},
		"ScavFac1": {
			assembly: "Assembly0",
			order: CAM_ORDER_PATROL,
			data: { pos: [ "Assembly0", "Patrol0_1", "Patrol0_2", "Patrol0_3", "Patrol0_4", "Patrol0_5" ], interval: (camSecondsToMilliseconds(8))},
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.trikeheavy ]
		},
		"ScavFac2": {
			assembly: "Assembly1",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlayerBase" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 16 : 12)),
			templates: [ cTempl.bjeepheavy, cTempl.rbjeep, cTempl.bjeepheavy, cTempl.buscan, cTempl.bjeepheavy, cTempl.firetruck ]
		},
		"ScavFac3": {
			assembly: "Assembly1",
			order: CAM_ORDER_PATROL,
			data: { pos: [ "Patrol1_0", "Patrol1_1" ], interval: (camSecondsToMilliseconds(8))},
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.bjeepheavy, cTempl.bjeeprocket ]
		},
		"ScavFac4": {
			assembly: "Assembly1",
			order: CAM_ORDER_DEFEND,
			data: { pos: "Defend1_0", radius: 1280 },
			groupSize: 10,
			maxSize: 20,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 8 : 4)),
			templates: [ cTempl.blokerpg, cTempl.blokeheavy, cTempl.bjeepheavy, cTempl.rbjeep, cTempl.firecan ]
		},
		"ScavFac5": {
			assembly: "Assembly2",
			order: CAM_ORDER_PATROL,
			data: { pos: [ "Patrol1_0", "Patrol1_1" ], interval: (camSecondsToMilliseconds(8))},
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.rbjeep8 ]
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
			data: { pos: "DefendZ", radius: 2560 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 6 : 4)),
			templates: [ cTempl.blokerpg ]
		},
		"ScavFac1": {
			assembly: "Assembly0",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 2560 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.trikeheavy ]
		},
		"ScavFac2": {
			assembly: "Assembly1",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 2560 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 16 : 12)),
			templates: [ cTempl.bjeepheavy, cTempl.rbjeep, cTempl.bjeepheavy, cTempl.buscan, cTempl.bjeepheavy, cTempl.firetruck ]
		},
		"ScavFac3": {
			assembly: "Assembly1",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 2560 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.bjeepheavy, cTempl.bjeeprocket ]
		},
		"ScavFac4": {
			assembly: "Assembly1",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 2560 },
			groupSize: 10,
			maxSize: 20,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 8 : 4)),
			templates: [ cTempl.blokerpg, cTempl.blokeheavy, cTempl.bjeepheavy, cTempl.rbjeep, cTempl.firecan ]
		},
		"ScavFac5": {
			assembly: "Assembly2",
			order: CAM_ORDER_DEFEND,
			data: { pos: "DefendZ", radius: 2560 },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.rbjeep8 ]
		},
	});
	enableFactories()
}

function camEnemyBaseEliminated_scavGroup0()
{
	camPlayVideos({video: "MBA1B_MSG1", type: MISS_MSG});
	makeComponentAvailable("BabaRPG", CAM_HUMAN_PLAYER);
	makeComponentAvailable("BabaRocket", CAM_HUMAN_PLAYER);
	camCompleteRequiredResearch([ "R-Wpn-BMG3", "R-Wpn-JMG3", "R-Wpn-TMG3", "R-Wpn-BAMG3"], CAM_HUMAN_PLAYER );
	enableStructure("A0BaBaBunker", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaMortarPit", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaRocketPit", CAM_HUMAN_PLAYER);
	enableStructure("A0BaBaRocketPitAT", CAM_HUMAN_PLAYER);
}

function isNASDAcaptured()
{
	if (enumStruct(5).length === 0)
	{
		return true;
	}
}
function enableFactories()
{
	camEnableFactory("ScavFac0");
	camEnableFactory("ScavFac1");
	camEnableFactory("ScavFac2");
	camEnableFactory("ScavFac3");
	camEnableFactory("ScavFac4");
	camEnableFactory("ScavFac5");
}

changePlayerColour(CAM_HUMAN_PLAYER, 5);

function eventStartLevel()
{
	var startpos = getObject("PlayerBase");
	var lz = getObject("LandingZone");

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "CAM_A1C", {
		callback: "isNASDAcaptured",
	});
	

	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	
	setAlliance(4, 5, true);
	setAlliance(CAM_HUMAN_PLAYER, 5, true);
	setAlliance(7, 5, true);
	setAlliance(7, 4, true);
	changePlayerColour(5, 10);
	changePlayerColour(4, 10);

	// Give player briefing.
	
	camPlayVideos({video: "MBA1B_MSG", type: MISS_MSG});
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
		"R-Vehicle-BodyA01", "R-Struc-Research-Module", "R-Sys-MobileRepairTurret01", 
		"R-Sys-Sensor-Turret01", "R-Wpn-Flamer01Mk1" ]},
		"resarti": { tech: [ "R-Struc-ResearchFacility", "R-Struc-Research-Module" ]},
		"crarti": { tech: "R-Struc-CommandRelay" },
		"preqres1": { tech: [ "R-Sys-Sensor-Tower01", "R-Defense-Tower01" ]},
		"cyfacarti": { tech: "R-Struc-Factory-Cyborg" },
		"reparti": { tech: "R-Struc-RepairFacility" },
		"preqres2": { tech: [ "R-Sys-Engineering01", "R-Wpn-Flamer-ROF01", "R-Wpn-Flamer-Damage01" ]},
		"wallarti": { tech: "R-Defense-HardcreteWall" },
		"traparti": { tech: "R-Defense-TankTrap01" },
		"preqres3": { tech: [ "R-Wpn-MG-Damage01", "R-Wpn-MG-ROF01" ]},
		"gatearti": { tech: "R-Defense-HardcreteGate" },
	});
	
	// Feed libcampaign.js with data to do the rest.
	camSetEnemyBases({
		"scavGroup": {
			cleanup: "ScavPost0",
			detectMsg: "CA1B_POST0",
			detectSnd: "pcv375.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"scavGroup0": {
			cleanup: "ScavBase0",
			detectMsg: "CA1B_BASE0",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"scavGroup1": {
			cleanup: "ScavBase1",
			detectMsg: "CA1B_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"scavGroup2": {
			cleanup: "ScavBase",
			detectMsg: "CA1B_BASE2",
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 6 : 4)),
			templates: [ cTempl.blokerpg ]
		},
		"ScavFac1": {
			assembly: "Assembly0",
			order: CAM_ORDER_PATROL,
			data: { pos: [ "Assembly0", "Patrol0_1", "Patrol0_2", "Patrol0_3", "Patrol0_4", "Patrol0_5" ], interval: (camSecondsToMilliseconds(8))},
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.trikeheavy ]
		},
		"ScavFac2": {
			assembly: "Assembly1",
			order: CAM_ORDER_ATTACK,
			data: { pos: "PlayerBase" },
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 16 : 12)),
			templates: [ cTempl.bjeepheavy, cTempl.rbjeep, cTempl.bjeepheavy, cTempl.buscan, cTempl.bjeepheavy, cTempl.firetruck ]
		},
		"ScavFac3": {
			assembly: "Assembly1",
			order: CAM_ORDER_PATROL,
			data: { pos: [ "Patrol1_0", "Patrol1_1" ], interval: (camSecondsToMilliseconds(8))},
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.bjeepheavy, cTempl.bjeeprocket ]
		},
		"ScavFac4": {
			assembly: "Assembly1",
			order: CAM_ORDER_DEFEND,
			data: { pos: "Defend1_0", radius: 1280 },
			groupSize: 10,
			maxSize: 20,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 8 : 4)),
			templates: [ cTempl.blokerpg, cTempl.blokeheavy, cTempl.bjeepheavy, cTempl.rbjeep, cTempl.firecan ]
		},
		"ScavFac5": {
			assembly: "Assembly2",
			order: CAM_ORDER_PATROL,
			data: { pos: [ "Patrol1_0", "Patrol1_1" ], interval: (camSecondsToMilliseconds(8))},
			groupSize: 8,
			maxSize: 16,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty === EASY || difficulty === MEDIUM) ? 10 : 6)),
			templates: [ cTempl.rbjeep8 ]
		},
	});
	enableFactories()
}
