using BookGuideAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookGuideAPI.Persistence.Contexts
{
    public class BookGuideDbContext : DbContext
    {
        public BookGuideDbContext(DbContextOptions<BookGuideDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Library> Libraries { get; set; }
        public DbSet<Borrowing> Borrowings { get; set; }
        public DbSet<OnlineBook> OnlineBooks { get; set; }
        public DbSet<LibraryBook> LibraryBooks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<LibraryBook>()
                .HasOne(lb => lb.Book)
                .WithMany(b => b.LibraryBooks)
                .HasForeignKey(lb => lb.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LibraryBook>()
                .HasOne(lb => lb.Library)
                .WithMany(l => l.LibraryBooks)
                .HasForeignKey(lb => lb.LibraryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Borrowing>()
                .HasOne(b => b.User)
                .WithMany(u => u.Borrowings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Borrowing>()
                .HasOne(b => b.Book)
                .WithMany(bk => bk.Borrowings)
                .HasForeignKey(b => b.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Borrowing>()
                .HasOne(b => b.Library)
                .WithMany(l => l.Borrowings)
                .HasForeignKey(b => b.LibraryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OnlineBook>()
                .HasOne(ob => ob.Book)
                .WithOne(b => b.OnlineBook)
                .HasForeignKey<OnlineBook>(ob => ob.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Library)
                .WithMany()
                .HasForeignKey(u => u.LibraryId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<Book>()
                .Property(b => b.Category)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
