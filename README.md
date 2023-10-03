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

## CanceledStarlord
[Import String](dist/CanceledStarlord.component.lzstring.txt)

This will show you how often a given balance druid has canceled Star Lord.
Currently it also counts deaths while Star Lord runs as canceled.


## PowerUsageTable
[Import String](dist/PowerUsageTable.component.lzstring.txt)

This component will show you how much of each resource type you spent.
This should give you an overview on how you used your resources.

___
This repository uses the [WCL TS Components Template](https://github.com/JoschiGrey/WCL-TS-Components)