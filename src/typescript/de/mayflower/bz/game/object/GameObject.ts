
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The parent class of all game objects.
    *******************************************************************************************************************/
    export abstract class GameObject
    {
        /** The stage this game object belongs to. */
        protected           readonly        stage                       :bz.Stage                       = null;
        /** All meshes this game object consists of. */
        protected           readonly        model                       :bz.Model                       = null;

        /** ************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param stage  The stage this game object belongs to.
        *   @param model  The model for this game object.
        ***************************************************************************************************************/
        protected constructor( stage:bz.Stage, model:bz.Model )
        {
            this.stage         = stage;
            this.model         = model;
        }

        /** ************************************************************************************************************
        *   Returns the model of this game object.
        *
        *   @return The physical representation of this game object.
        ***************************************************************************************************************/
        public getModel() : bz.Model
        {
            return this.model;
        }

        /** ************************************************************************************************************
        *   Renders one tick of the game loop for this game object.
        ***************************************************************************************************************/
        public render() : void
        {
            // empty implementation to overwrite
        }

        /** ************************************************************************************************************
        *   Disposes the model of this game object.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.model.dispose();
        }

        /** ************************************************************************************************************
        *   Sets visibility for the model of this game object.
        *
        *   @param visible The new visibility for this game object.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            this.model.setVisible( visible );
        }
    }
