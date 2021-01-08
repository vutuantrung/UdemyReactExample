import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { BurgerBuilder } from './BurgerBuilder';

configure({
    adapter: new Adapter()
});

describe('<BurderBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    })

    it('should render <BurgerBuilder /> when receiving ingredients', () => {
        wrapper.setProps({
            ings: {
                meat: 1,
                salad: 0,
            }
        });

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})