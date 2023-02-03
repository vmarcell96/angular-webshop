using AngularWebshop.BusinessLayer;

namespace AngularWebshop.BusinessLayerTest
{
    public class CustomerTest
    {
        //-- Arrange

        //-- Act

        //-- Assert
        [Fact]
        public void FullName_Valid()
        {
            //-- Arrange

            Customer customer = new Customer
            {
                FirstName = "Bilbo",
                LastName = "Baggins"
            };
            string expected = "Baggins, Bilbo";

            //-- Act

            string actual = customer.FullName;

            //-- Assert

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void FullName_FirstNameEmpty()
        {
            //-- Arrange

            Customer customer = new Customer
            {
                LastName = "Baggins"
            };
            string expected = "Baggins";

            //-- Act

            string actual = customer.FullName;

            //-- Assert

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void FullName_LastNameEmpty()
        {
            //-- Arrange

            Customer customer = new Customer
            {
                FirstName = "Bilbo",
            };
            string expected = "Bilbo";

            //-- Act

            string actual = customer.FullName;

            //-- Assert

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void ValidateValid()
        {
            //-- Arrange
            var customer = new Customer
            {
                LastName = "Baggins",
                EmailAddress = "fbaggins@hobbiton.me"
            };

            var expected = true;

            //-- Act
            var actual = customer.Validate();

            //-- Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void ValidateMissingLastName()
        {
            //-- Arrange
            var customer = new Customer
            {
                EmailAddress = "fbaggins@hobbiton.me"
            };

            var expected = false;

            //-- Act
            var actual = customer.Validate();

            //-- Assert
            Assert.Equal(expected, actual);
        }
    }
}