using AngularWebshop.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularWebshop.API.DbContexts
{
    public class AngularWebshopContext : DbContext
    {
        // deriving from dbcontext ensures that these dbsets wont be null upon construction
        // these warnings can be ignored
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Rating> Ratings { get; set; } = null!;
        public DbSet<Tag> Tags { get; set; } = null!;

        // one way to initialize connection
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlite("connectionstring");
        //    base.OnConfiguring(optionsBuilder);
        //}

        //Another way for db connection
        //Need to use program.cs
        public AngularWebshopContext(DbContextOptions<AngularWebshopContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasData(
                new Product("Apple")
                {
                    Id= 1,
                    Description = "An apple."
                },
                new Product("Orange")
                {
                    Id= 2,
                    Description = "An orange."
                },
                new Product("Strawberry")
                {
                    Id= 3,
                    Description = "A strawberry."
                });
            modelBuilder.Entity<Rating>()
                .HasData(
                new Rating("Nice flavour", 5)
                {
                    Id = 1,
                    Description = "This apple had nice flavour.",
                    ProductId = 1,
                },
                new Rating("Nice colour", 4)
                {
                    Id = 2,
                    Description = "The orange had incredible colour, but it was a bit sour.",
                    ProductId = 2,
                },
                new Rating("Sour strawberry", 2)
                {
                    Id = 3,
                    Description = "The strawberries were unripe.",
                    ProductId = 3,
                });
            modelBuilder.Entity<Tag>()
                .HasData(
                new Tag("fruit")
                {
                    Id = 1,
                    ProductId= 1,
                },
                new Tag("citrus")
                {
                    Id = 2,
                    ProductId = 2,
                },
                new Tag("unripe")
                {
                    Id = 3,
                    ProductId = 3,
                });
            base.OnModelCreating(modelBuilder);
        }
    }
}
