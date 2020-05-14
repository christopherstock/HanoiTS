
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the custom loading screen.
    *******************************************************************************************************************/
    export class LoadingScreen implements BABYLON.ILoadingScreen
    {
        /** Pointless interface implementation field. */
        public                          loadingUIBackgroundColor            :string                     = '';
        /** Pointless interface implementation field. */
        public                          loadingUIText                       :string                     = '';

        /** The canvas being used by the game engine. */
        private             readonly    canvas                              :HTMLCanvasElement          = null;
        /** The div that contains the loading image. */
        private             readonly    loadingDiv                          :HTMLDivElement             = null;

        /** ************************************************************************************************************
        *   Creates the custom loading screen.
        *
        *   @param canvas The canvas element being used by the babylon.JS engine.
        ***************************************************************************************************************/
        public constructor( canvas:HTMLCanvasElement )
        {
            this.canvas = canvas;

            this.loadingDiv = document.createElement( 'div' );
            this.loadingDiv.id = 'loading';
            this.loadingDiv.style.backgroundImage = ( 'url( ' + bz.SettingEngine.LOADING_LOGO + ' )' );

            document.body.appendChild( this.loadingDiv );
        }

        /** ************************************************************************************************************
        *   Hides the canvas and shows the loading ui.
        ***************************************************************************************************************/
        public displayLoadingUI() : void
        {
            this.canvas.style.display     = 'none';
            this.loadingDiv.style.display = 'block';

            this.resizeLoadingDivToCanvasDimensions();
        }

        /** ************************************************************************************************************
        *   Hides the loading ui and shows the canvas.
        ***************************************************************************************************************/
        public hideLoadingUI() : void
        {
            this.canvas.style.display     = 'block';
            this.loadingDiv.style.display = 'none';
        }

        /** ************************************************************************************************************
        *   Centers the loading div according to the new canvas size.
        ***************************************************************************************************************/
        public resizeLoadingDivToCanvasDimensions() : void
        {
/*
            this.loadingDiv.style.left = ( ( window.innerWidth  - 200 ) / 2 ) + 'px';
            this.loadingDiv.style.top  = ( ( window.innerHeight - 200 ) / 2 ) + 'px';
*/
        }
    }
