
    import * as bjsg from 'babylonjs-gui';
    import * as bz   from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a Graphical User Interface that is displayed in the foreground of the screen.
    *******************************************************************************************************************/
    export abstract class GUI
    {
        /** The fullscreen gui in foreground. */
        protected           readonly        guiFg                   :bjsg.AdvancedDynamicTexture            = null;
        /** The FPS text block. */
        private             readonly        fpsText                 :bjsg.TextBlock                         = null;

        /** The pause GUI. */
        private             readonly        pauseGui                :bz.GUIPause                            = null;

        /** ************************************************************************************************************
        *   Creates a new abstract Heads Up Display.
        *
        *   @param scene The scene to create this GUI for.
        ***************************************************************************************************************/
        protected constructor( scene:BABYLON.Scene )
        {
            // create foreground GUI
            this.guiFg = bz.GUIFactory.createGUI( scene, true );

            // pause GUI
            this.pauseGui = new bz.GUIPause( this.guiFg );

            // FPS text
            this.fpsText = bz.GUIFactory.createTextBlock
            (
                '',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                -bz.SettingGUI.GUI_BORDER_X,
                bz.SettingGUI.GUI_BORDER_Y,
                250,
                25,
                bjsg.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( this.fpsText );
            if ( !bz.SettingDebug.SHOW_FPS )
            {
                this.fpsText.isVisible = false;
            }
        }

        /** ************************************************************************************************************
        *   Inits all GUI components for the 3D Product Configurator..
        ***************************************************************************************************************/
        public abstract init() : void;

        /** ************************************************************************************************************
        *   Updates the GUIs to the specified dimensions.
        *
        *   @param width  The width  to set as the new GUI width.
        *   @param height The height to set as the new GUI height.
        ***************************************************************************************************************/
        public updateSize( width:number, height:number ) : void
        {
            this.guiFg.idealWidth  = width;
            this.guiFg.idealHeight = height;

            this.guiFg.scaleTo( width, height );
        }

        /** ************************************************************************************************************
        *   Disposes all elements of this GUI.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.guiFg.dispose();
        }

        /** ************************************************************************************************************
        *   Updates the GUI information for the current game tick.
        *
        *   @param pause Specifies if the pause state is currently active.
        ***************************************************************************************************************/
        public render( pause:boolean ) : void
        {
            this.updateFps();

            if ( pause )
            {
                // this.pauseGui.render();
            }
        }

        /** ************************************************************************************************************
        *   Shows or hides the pause GUI.
        *
        *   @param visible The visibility to set for the pause GUI.
        ***************************************************************************************************************/
        public setPauseGuiVisibility( visible:boolean ) : void
        {
            this.pauseGui.setVisibility( visible );
        }

        /** ************************************************************************************************************
        *   Updates the Frames Per Second counter.
        ***************************************************************************************************************/
        private updateFps() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.getFps().toFixed( 2 ) + ' fps';
        }
    }
