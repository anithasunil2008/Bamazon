# Bamazon

Bamazon is a command line app that allows users to enter as either a customer, manager, or supervisor. Each role has different interactions with the MySQL database that holds the information. 

Technologies Used: Node, MySQL, Javascript

Description:

Customers have the ability to select the product they would like to purchase by entering the ID and selecting the amount of the product they would like to buy. The chart updates the new quantity and product sales.

Managers have the ability to view products that are currently for sale, view low inventory, add to inventory, and add new product. The currently for sale is a get request from the MySQL database. The low inventory is a get request with a filter of stock quantity. The add to inventory is a put request that updates stock quantity. The add new product is a post request that adds a new product to the selection.

Supervisors can choose between two actions. View Product Sales by Department and Create New Department. The View Product Sales by Department is a join table that records the total profit information.

Link to BamazonCustomer:
link1: https://youtu.be/ZUE9EJ9xWwM
link2: https://youtu.be/bZu-ud0UvMQ

Link to Bamazonmanager:
Link1: https://youtu.be/89DBzQBsw5s
Link2: https://youtu.be/fOdS_IZWMHc

Link to BamazonSupervisor:
Link1: https://youtu.be/0UWi_CFMQho
Link2: https://youtu.be/Z-5YRNeu_gY