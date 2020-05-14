
    import * as chai    from 'chai';
    import { MathUtil } from '../../../../../typescript/de/mayflower/bz';

    describe( 'MathUtil', () =>
    {
        it( 'gets the sinus from 90 degrees', () =>
        {
            const result:number = MathUtil.sinDegrees( 90.0 );
            chai.expect( result ).to.equal( 1.0 );
        });
    });
