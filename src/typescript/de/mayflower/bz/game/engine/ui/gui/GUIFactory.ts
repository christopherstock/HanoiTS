
    import * as bjsg from 'babylonjs-gui';
    import * as bz   from '../../../..';

    /** ****************************************************************************************************************
    *   Creates all types of GUI components.
    *******************************************************************************************************************/
    export abstract class GUIFactory
    {
        /** Next ID to assign for GUI component creation. */
        private         static          nextGuiId                           :number                 = 0;

        /** ************************************************************************************************************
        *   Creates a fullscreen GUI in bg or fg.
        *
        *   @param scene      The scene that contains this light.
        *   @param foreground Specifies if this GUI shall be set in foreground of this scene.
        *                     <code>false</code> will put this GUI into the background.
        *
        *   @return The fullscreen GUI.
        ***************************************************************************************************************/
        public static createGUI
        (
            scene      :BABYLON.Scene,
            foreground :boolean
        )
        : bjsg.AdvancedDynamicTexture
        {
            const gui:bjsg.AdvancedDynamicTexture = bjsg.AdvancedDynamicTexture.CreateFullscreenUI
            (
                GUIFactory.createNextGuiId(),
                foreground
/*
                scene,
                BABYLON.Texture.NEAREST_SAMPLINGMODE
*/
            );

            gui.renderAtIdealSize = true;
            gui.useSmallestIdeal  = false;
            gui.renderScale       = 1.0;

            return gui;
        }

        /** ************************************************************************************************************
        *   Creates a rectangle for the GUI.
        *
        *   @param x           Position of the left edge.
        *   @param y           Position of the top edge.
        *   @param width       The horizontal dimension.
        *   @param height      The vertical dimension.
        *   @param colorBorder A css value for the border color.
        *   @param colorFill   A css value for the fill color.
        *
        *   @return The specified rectangle.
        ***************************************************************************************************************/
        public static createRectangle
        (
            x             :number,
            y             :number,
            width         :number,
            height        :number,
            colorBorder   :string,
            colorFill     :string
        )
        : bjsg.Rectangle
        {
            const rectangle:bjsg.Rectangle = new bjsg.Rectangle( GUIFactory.createNextGuiId() );

            rectangle.left       = x;
            rectangle.top        = y;
            rectangle.width      = String( width  ) + 'px';
            rectangle.height     = String( height ) + 'px';
            rectangle.color      = colorBorder;
            rectangle.background = colorFill;

            rectangle.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            rectangle.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            return rectangle;
        }

        /** ************************************************************************************************************
        *   Creates a text block for the GUI.
        *
        *   @param text          The text to set into the block.
        *   @param fontSize      The font size of the text to display.
        *   @param color         A css value for the text color.
        *   @param shadowColor   A css value for the text's shadow color.
        *   @param x             Position of the left edge.
        *   @param y             Position of the top edge.
        *   @param width         The horizontal dimension.
        *   @param height        The vertical   dimension.
        *   @param alignmentHorz The horizontal alignment.
        *   @param alignmentVert The vertical   alignment.
        *   @param onPointerDown A callback to invoke when the pointer is down.
        *
        *   @return The specified text block.
        ***************************************************************************************************************/
        public static createTextBlock
        (
            text          :string,
            fontSize      :number,
            color         :string,
            shadowColor   :string,
            x             :number,
            y             :number,
            width         :number,
            height        :number,
            alignmentHorz :number,
            alignmentVert :number,
            onPointerDown :() => void
        )
        : bjsg.TextBlock
        {
            const textBlock:bjsg.TextBlock = new bjsg.TextBlock(  GUIFactory.createNextGuiId()  );

            textBlock.text     = text;
            textBlock.left     = x;
            textBlock.top      = y;
            textBlock.width    = String( width    ) + 'px';
            textBlock.height   = String( height   ) + 'px';
            textBlock.fontSize = String( fontSize ) + 'px';
            textBlock.color    = color;

            if ( shadowColor !== null )
            {
                textBlock.shadowColor   = shadowColor;
                textBlock.shadowBlur    = 0.0;
                textBlock.shadowOffsetX = 1.0;
                textBlock.shadowOffsetY = 1.0;
            }

            textBlock.horizontalAlignment     = alignmentHorz;
            textBlock.verticalAlignment       = alignmentVert;
            textBlock.textHorizontalAlignment = alignmentHorz;
            textBlock.textVerticalAlignment   = alignmentVert;

            if ( onPointerDown )
            {
                textBlock.onPointerDownObservable.add
                (
                    () : void => {
                        onPointerDown();
                    }
                );
            }

            return textBlock;
        }

        /** ************************************************************************************************************
        *   Creates a button for the GUI.
        *
        *   @param text    The text to set into the block.
        *   @param colorFg A css value for the text color.
        *   @param colorBg A css value for the background color.
        *   @param x       Position of the left edge.
        *   @param y       Position of the top edge.
        *   @param width   The horizontal dimension.
        *   @param height  The vertical dimension.
        *   @param onClick The callback to invoke when the button is clicked.
        *
        *   @return The specified button.
        ***************************************************************************************************************/
        public static createButton
        (
            text    :string,
            colorFg :string,
            colorBg :string,
            x       :number,
            y       :number,
            width   :number,
            height  :number,
            onClick :() => void
        )
        : bjsg.Button
        {
            const button:bjsg.Button = bjsg.Button.CreateSimpleButton
            (
                GUIFactory.createNextGuiId(),
                text
            );

            button.color      = colorFg;
            button.background = colorBg;
            button.left       = x;
            button.top        = y;
            button.width      = String( width  ) + 'px';
            button.height     = String( height ) + 'px';

            button.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            button.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            button.onPointerClickObservable.add
            (
                () => {
                    onClick();
                }
            );

            return button;
        }

        /** ************************************************************************************************************
        *   Creates a line for the GUI.
        *
        *   @param x1          Start position X.
        *   @param y1          Start position Y.
        *   @param x2          End position X.
        *   @param y2          End position Y.
        *   @param width       The line width in pixels.
        *   @param color       The color of the line.
        *   @param shadowColor The color of the shadow or <code>null</code> for no shadow.
        *
        *   @return The specified line.
        *
        *   @deprecated This line looks blurry and shabby. Use createRect with a height of one instead.
        ***************************************************************************************************************/
        public static createLine
        (
            x1          :number,
            y1          :number,
            x2          :number,
            y2          :number,
            width       :number,
            color       :string,
            shadowColor :string
        )
        : bjsg.Line
        {
            const line:bjsg.Line = new bjsg.Line
            (
                GUIFactory.createNextGuiId()
            );

            line.x1 = x1;
            line.y1 = y1;
            line.x2 = x2;
            line.y2 = y2;

            line.color     = color;
            line.lineWidth = width;

            if ( shadowColor !== null )
            {
                line.shadowColor   = shadowColor;
                line.shadowBlur    = 0.0;
                line.shadowOffsetX = 1.0;
                line.shadowOffsetY = 1.5;
            }

            return line;
        }

        /** ************************************************************************************************************
        *   Creates an image for the GUI.
        *
        *   @param filename    The name of the image file to display.
        *   @param x           Left edge of the image.
        *   @param y           Top edge of the image.
        *   @param alignHorz   Horizontal alignment.
        *   @param alignVert   Vertical alignment.
        *   @param shadowColor The color of the shadow or <code>null</code> for no shadow.
        *
        *   @return The specified image.
        ***************************************************************************************************************/
        public static createImage
        (
            filename    :string,
            x           :number,
            y           :number,
            alignHorz   :number,
            alignVert   :number,
            shadowColor :string
        )
        : bjsg.Image
        {
            const image:bjsg.Image = new bjsg.Image
            (
                GUIFactory.createNextGuiId(),
                bz.SettingResource.PATH_IMAGE_GUI + filename
            );

            image.horizontalAlignment = alignHorz;
            image.verticalAlignment   = alignVert;
            image.autoScale           = true;
            image.stretch             = bjsg.Image.STRETCH_NONE;

            image.left = x;
            image.top  = y;

            if ( shadowColor !== null )
            {
                image.shadowColor   = shadowColor;
                image.shadowBlur    = 0.0;
                image.shadowOffsetX = 1.0;
                image.shadowOffsetY = 1.0;
            }

            return image;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new gui component to create.
        *
        *   @return The next free unique id for a new gui component to create.
        ***************************************************************************************************************/
        private static createNextGuiId() : string
        {
            return 'gui' + String( GUIFactory.nextGuiId++ );
        }
    }
