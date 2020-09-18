import { connect } from 'react-redux';

const Watchful = ({
    children,
    menu,
    action,
    permisssions
}) => permisssions[menu]
    && (permisssions[menu].indexOf(action) >= 0
        || permisssions[menu].some(e => action.indexOf(e) >= 0))
        ? children : '';

const mapState = state => ({
    permisssions: state.auth.permisssions,
}), mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Watchful);