import '../../core/services/menus.client.service';

// Configuring the Customer module
angular.module('customer').run(['Menus',
	function(Menus) {
		// Set sidebar menu items for admin
		Menus.addMenuItem('admin', 'Client Database', 'admin/customers', 'item', 'root.listCustomers', '', ['admin'], 0);

		// Set sidebar menu items for customer
		Menus.addMenuItem('customer', 'Edit Application', '/edit', 'item', 'root.editCustomerUser({customerId: $ctrl.user._id})', '', ['customer'], 0);
	}
]);
