import angular from 'angular';

import {loadCustomers, selectors as customerSelectors} from '../../../store/customer';

const mapStateToThis = state => ({
  customers: customerSelectors.getAllCustomers(state.customer.ids, state.entities)
});

const mapDispatchToThis = dispatch => ({
  loadCustomers: () => dispatch(loadCustomers())
});

export default angular.module('customer')
  .component('customerList', {
    controller: ['$ngRedux', function($ngRedux) {
      this.$onInit = () => {
        this.unsubscribe = $ngRedux.connect(mapStateToThis, mapDispatchToThis)(this);
        this.loadCustomers();
      };

      this.$onDestroy = () => this.unsubscribe;

      // Add plugins into datatable
			this.dtOptions = {
				dom: 'TCRlfrtip',
				tableTools: {
					sSwfPath: '/lib/datatables-tabletools/swf/copy_csv_xls.swf',
					aButtons: ['copy', 'xls']
				}
			};
    }],
    template: `
      <!-- Content header (Page header) -->
      <section class="content-header">
        <h1>Client Database</h1>
      </section>
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="box">
              <!-- Box header -->
              <div class="box-header">
                <h3 class="box-title">Applications</h3>
              </div><!-- /.box-header-->
              <!-- Box body -->
              <div class="box-body table-responsive">
                <!-- Data table -->
                <table
                  class="table table-bordered table-striped"
                  datatable="ng"
                  dt-options="$ctrl.dtOptions"
                  print-table="$ctrl.customers"
                >
                  <!-- Table columns -->
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Full Address</th>
                      <th>Telephone Number</th>
                      <th>Email</th>
                      <th>Delivery Instructions</th>
                      <th>Household</th>
                      <th>Assigned Driver</th>
                      <th print-remove>Status</th>
                      <th print-remove>Actions</th>
                    </tr>
                  </thead><!-- /.table columns -->
                  <!-- Table footer -->
                  <tfoot></tfoot><!-- /.table footer -->
                  <!-- Table content -->
                  <tbody>
                    <tr data-ng-repeat="customer in $ctrl.customers">
                      <td><span data-ng-bind="customer.id"></span></td>
                      <td><span data-ng-bind="customer.fullName"></span></td>
                      <td><span data-ng-bind="customer.fullAddress"></span></td>
                      <td><span data-ng-bind="customer.telephoneNumber"></span></td>
                      <td><span data-ng-bind="customer.email"></span></td>
                      <td><span data-ng-bind="customer.deliveryInstructions"></span></td>
                      <td><span data-ng-bind="customer.householdSummary"></span></td>
                      <td><span data-ng-bind="customer.assignedTo.fullName"></span></td>
                      <td print-remove>
                        <span data-ng-bind="customer.status" class="label"
                              data-ng-class="{ 'label-success': customer.status === 'Accepted',
                                                'label-danger': customer.status === 'Rejected',
                                                'label-info': customer.status === 'Pending',
                                                'label-warning': customer.status === 'Inactive' }">
                        </span>
                      </td>
                      <td print-remove>
                        <a data-ng-href="/#!/admin/customers/{{customer._id}}" class="btn btn-info btn-flat btn-xs"><i class="fa fa-eye"></i> View</a>
                        <a data-ng-href="/#!/admin/customers/{{customer._id}}/edit" class="btn btn-primary btn-flat btn-xs"><i class="fa fa-pencil"></i> Edit</a>
                      </td>
                    </tr>
                  </tbody><!-- /.table content -->
                </table><!-- /.data table -->
                <br>
                <button class="btn btn-default" print-btn print-landscape><i class="fa fa-print"></i> Print</button>
              </div>
            </div><!-- /.box -->
          </div><!-- /.col -->
        </div><!-- /.row -->
        <div data-ng-show="$ctrl.error" class="text-danger">
          <strong data-ng-bind="$ctrl.error"></strong>
        </div>
      </section>
    `
  })
  .name;