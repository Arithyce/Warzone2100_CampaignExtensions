include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");


function eventStartLevel()
{
	const PLAYER_POWER = 0;

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "GAMMA_OUT");

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
}
