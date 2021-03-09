import React from 'react';
import { connect } from 'react-redux';
import { createSelector} from 'reselect';

function withAuth(Component) {
  function WithAuth(props) {
    console.log(">>>>>>")
    return <Component {...props} />;
  }

  /** Reduct Connector
   * Setup selector, mapDisPatchToProps, mapDisPatchToProps
   */
  const userSelector = createSelector([((state) => state.user)], (state) => state.isAuthenticated);
  const mapStateToProps = (state) => {
    return {
      isAuthenticated: userSelector(state)
    }
  }

  return connect(mapStateToProps)(WithAuth);
}

export default withAuth;
