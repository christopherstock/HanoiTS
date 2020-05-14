
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Manages the Graphical User Interface that contains all GUI elements for one game level.
    *******************************************************************************************************************/
    export class GUIGame extends bz.GUI
    {
        /** The wearpon image. */
        // protected                           wearponImage            :bjsg.Image                         = null;

        /** ************************************************************************************************************
        *   Creates a new Heads Up Display for a game level.
        *
        *   @param scene The babylon.JS scene to create this GUI for.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super( scene );
        }

        /** ************************************************************************************************************
        *   Initializes the Heads Up Display for a game level.
        ***************************************************************************************************************/
        public init() : void
        {
/*
            this.wearponImage = bz.GUIFactory.createImage
            (
                'wearpon/autoShotgun.png',
                -bz.SettingGUI.GUI_BORDER_X,
                0,
                bjsg.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                bjsg.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );
            this.guiFg.addControl( this.wearponImage );
*/
        }

        /** ************************************************************************************************************
        *   Updates the GUI information for the current game tick.
        *
        *   @param pause Specifies if the pause state is currently active.
        ***************************************************************************************************************/
        public render( pause:boolean ) : void
        {
            super.render( pause );
        }
    }
