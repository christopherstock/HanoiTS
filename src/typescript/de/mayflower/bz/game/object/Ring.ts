
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a Ring of the Hanoi Towers.
    *******************************************************************************************************************/
    export class Ring extends bz.Wall
    {
        public          size        :number         = 0;

        /** ************************************************************************************************************
        *   Creates a new Ring instance.
        *
        *   @param size   The size of the ring.
        *   @param stage  The stage this wall belongs to.
        *   @param model  The model that represents this wall.
        ***************************************************************************************************************/
        public constructor( size:number, stage:bz.Stage, model:bz.Model )
        {
            super( stage, model );

            this.size = size;
        }
    }
