import * as bz from '../..';

/** ****************************************************************************************************************
 *   Represents a Pole of the Hanoi Towers.
 *******************************************************************************************************************/
export class Pole extends bz.Wall
{
    public rings :bz.Ring[] = [];

    /** ************************************************************************************************************
     *   Creates a new Pole instance.
     *
     *   @param stage  The stage this wall belongs to.
     *   @param model  The model that represents this wall.
     ***************************************************************************************************************/
    public constructor(stage:bz.Stage, model:bz.Model )
    {
        super( stage, model );
    }
}
