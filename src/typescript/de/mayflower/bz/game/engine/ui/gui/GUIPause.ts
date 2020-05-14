
    import * as bjsg from 'babylonjs-gui'
    import * as bz   from '../../../..';

    /** ****************************************************************************************************************
    *   Represents the Graphical User Interface of the pause screen / menu.
    *******************************************************************************************************************/
    export class GUIPause
    {
        /** The bg color for the GUI. */
        private     static  readonly        GUI_COLOR_BG            :string                                 = (
            'rgba( 100, 100, 100, 0.25 )'
        );

        /** The translucent background. */
        private             readonly        bg                      :bjsg.Rectangle                  = null;
        /** The 'pause' headline text. */
        private             readonly        headline                :bjsg.TextBlock                  = null;

        /** ************************************************************************************************************
        *   Initializes all components of the pause screen and adds them to the given component.
        *
        *   @param guiFg The gui to append all components to.
        ***************************************************************************************************************/
        public constructor( guiFg:bjsg.AdvancedDynamicTexture )
        {
            // bg
            this.bg = bz.GUIFactory.createRectangle
            (
                0,
                0,
                0,
                0,
                bz.SettingColor.COLOR_CSS_TRANSPARENT,
                GUIPause.GUI_COLOR_BG
            );
            this.bg.width  = '100%';
            this.bg.height = '100%';
            guiFg.addControl( this.bg );

            // headline
            this.headline = bz.GUIFactory.createTextBlock
            (
                'PAUSE MENU',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                0,
                bz.SettingGUI.GUI_BORDER_Y,
                250,
                25,
                bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            guiFg.addControl( this.headline );

            // initially hide all components
            this.setVisibility( false );
        }

        /** ************************************************************************************************************
        *   Shows or hides the pause GUI.
        *
        *   @param visible The visibility to set for the pause GUI.
        ***************************************************************************************************************/
        public setVisibility( visible:boolean ) : void
        {
            this.headline.isVisible = visible;
            this.bg.isVisible       = visible;
        }
    }
