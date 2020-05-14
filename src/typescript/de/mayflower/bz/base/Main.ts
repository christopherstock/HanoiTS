
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Complete MVP.
    *   TODO Animate camera rotation AND zoom into the level!
    *   TODO Prune unused code!
    *   TODO Fix all ESLint issues and IntelliJ Code Inspections.
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game. */
        public      static          game                    :bz.Game                    = null;

        /** ************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            Main.setTitle(   bz.SettingEngine.TITLE   );
            Main.setFavicon( bz.SettingEngine.FAVICON );

            Main.acclaim();

            Main.game = new bz.Game();
            Main.game.init();
        }

        /** ************************************************************************************************************
        *   Sets the document title.
        *
        *   @param title The title to set.
        ***************************************************************************************************************/
        private static setTitle( title:string ) : void
        {
            document.title = title;
        }

        /** ************************************************************************************************************
        *   Sets the document favicon path.
        *
        *   @param path The path to the favicon.
        ***************************************************************************************************************/
        private static setFavicon( path:string ) : void
        {
            const link:HTMLLinkElement = document.createElement( 'link' );
            link.rel  = 'shortcut icon';
            link.href = path;

            document.head.appendChild( link );
        }

        /** ************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            bz.Debug.acclaim.log( bz.SettingEngine.TITLE  );
            bz.Debug.acclaim.log();
        }
    }
