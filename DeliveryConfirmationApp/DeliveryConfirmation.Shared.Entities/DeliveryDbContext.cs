using DeliveryConfirmation.Shared.Entities.Entities;
using System.Data.Entity;

namespace DeliveryConfirmation.Shared.Entities
{
    public partial class DeliveryDbContext : DbContext
    {
        public DeliveryDbContext()
            : base("DeliveryContext")
        {
        }

        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<Truck> Trucks { get; set; }
        public virtual DbSet<Shipment> Shipments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Truck>()
                .HasKey(t => t.TruckId)
                .Property(t => t.TruckId).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Truck>()
                .Property(t => t.TruckModel).HasMaxLength(100).IsRequired().IsUnicode();

            modelBuilder.Entity<Truck>()
                .Property(t => t.TruckNumber).HasMaxLength(100).IsRequired().IsUnicode();

            modelBuilder.Entity<Truck>()
                        .Property(t => t.CreationDate).IsRequired().HasColumnType("datetime");

            modelBuilder.Entity<Truck>()
                        .Property(t => t.ModifiedDate).IsRequired().HasColumnType("datetime");

            modelBuilder.Entity<Shipment>()
                .HasKey(t => t.ShipmentId)
                .Property(t => t.CreationDate).IsRequired().HasColumnType("datetime"); //.HasDefaultValueSql("(getdate())");

            modelBuilder.Entity<Shipment>()
                .HasKey(t => t.ShipmentId)
                .Property(t => t.ModifiedDate).IsRequired().HasColumnType("datetime"); //.HasDefaultValueSql("(getdate())");

            modelBuilder.Entity<Shipment>()
                .Property(t => t.DestinationAddress).IsRequired().HasMaxLength(255).IsUnicode();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.DestinationName).IsRequired().HasMaxLength(50).IsUnicode();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.OriginAddress).IsRequired().HasMaxLength(255).IsUnicode();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.OriginName).IsRequired().HasMaxLength(50).IsUnicode();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.PackagesNumber).IsRequired();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.StatusId).IsRequired();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.IncidentalInformationId).IsRequired();

            modelBuilder.Entity<Shipment>()
                .Property(t => t.TrackingNumber).IsRequired();

            modelBuilder.Entity<Shipment>()
                .HasRequired(t => t.Truck)
                    .WithMany(t => t.Shipments)
                    .HasForeignKey(s => s.ShipmentId)
                    .WillCascadeOnDelete(false)
                    //.HasConstraintName("FK_Shipments_TruckId")
                    ;

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(DbModelBuilder modelBuilder);
    }
}