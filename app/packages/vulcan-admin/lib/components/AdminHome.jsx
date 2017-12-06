import React from 'react';
import { Components, withCurrentUser, AdminColumns } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import UserImport from 'meteor/pfe-log320/lib/components/userImport/UserImport';
import UserDelete from 'meteor/pfe-log320/lib/components/userDelete/UserDelete';
import ExerciceExport from 'meteor/pfe-log320/lib/components/exerciceExport/ExerciceExport';
import ExerciceImport from 'meteor/pfe-log320/lib/components/exerciceImport/ExerciceImport';

import '../modules/columns.js';

const AdminHome = ({ currentUser }) => (
  <div className="admin-home page container-fluid">
    <div className="row">
      <div className="col-md-3">
        <UserImport currentUser={currentUser} />
      </div>
      <div className="col-md-3">
        <UserDelete currentUser={currentUser} />
      </div>
      <div className="col-md-3">
        <ExerciceExport currentUser={currentUser} />
      </div>
      <div className="col-md-3">
        <ExerciceImport currentUser={currentUser} />
      </div>
    </div>
    <Components.ShowIf
      check={Users.isAdmin}
      document={currentUser}
      failureComponent={
        <p className="admin-home-message">
          <FormattedMessage id="app.noPermission" />
        </p>
      }
    >
      <Components.Datatable
        collection={Users}
        columns={AdminColumns}
        options={{
          fragmentName: 'UsersAdmin',
          terms: { view: 'usersAdmin' },
          limit: 20,
        }}
        showEdit={true}
      />
    </Components.ShowIf>
  </div>
);

export default withCurrentUser(AdminHome);
