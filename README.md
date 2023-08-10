# Joschis Warcraftlog Report Components

## AlterTimeHeals
[Import String](dist/AlterTimeHeals.component.lzstring.txt)

This component returns a table showing how much health was gained and lost in each use of Alter Time.
It accounts for manually canceled auras.

## GiantSlayerValue
[Import String](dist/GiantSlayerValue.component.lzstring.txt)

This component calculates how much of the Devastation Evoker Mastery got applied on average.
By comparing the Dragonrage value with the baseline, one can gauge the in vivo value of tyranny.


## DiedToLavaWave
[Import String](dist/DiedToLavaWave.component.lzstring.txt)

A graph that shows how often someone died after taking damage from lava wave.
By default a death is included, when the player took damage by Lava Wave between his death and the last time
he was at or above 95% health.

Known issue:
Because of a WCL bug you sometimes need to change the "Ignore Deaths after X events" filter a few times before this component works.

This component is easily customizable in the TS source!

## FireBreathAlyzer
WIP

Goal: should evaluate if Evokers Fire Breath should have been channeled longer.

___
This repository uses the [WCL TS Components Template](https://github.com/JoschiGrey/WCL-TS-Components)