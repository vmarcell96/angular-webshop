namespace AngularWebshop.BusinessLayer
{
    public class Customer
    {
        public Customer()
        {

        }

        public Customer(int customerId)
        {
            CustomerId= customerId;
        }

        public int CustomerId { get; private set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }

        private string _lastName;
        public string LastName
        { 
            get
            {
                return _lastName;
            }
            set
            {
                _lastName = value;
            }
        }

        

        public string FullName
        {
            get
            {
                string fullName = LastName;
                //There is a firstname
                if (!string.IsNullOrWhiteSpace(FirstName))
                {
                    //there is a lastname
                    if (!string.IsNullOrWhiteSpace(fullName))
                    {
                        fullName += ", ";
                    }
                    fullName += FirstName;
                }
                return fullName;
            }
        }
        /// <summary>
        /// Validates the customer data.
        /// </summary>
        /// <returns></returns>
        public bool Validate()
        {
            var isValid = true;

            if (string.IsNullOrWhiteSpace(LastName)) isValid= false;
            if (string.IsNullOrWhiteSpace(EmailAddress)) isValid= false;

            return isValid;
        }

        /// <summary>
        /// Retrieve one customer.
        /// </summary>
        public Customer Retrieve(int customerId) 
        {
            
            return new Customer();
        }

        /// <summary>
        /// Retrieve all customers.
        /// </summary>
        public List<Customer> Retrieve()
        {

            return new List<Customer>();
        }
        /// <summary>
        /// Saves the current customer.
        /// </summary>
        /// <returns></returns>
        public bool Save()
        {
            return true;
        }
    }
}