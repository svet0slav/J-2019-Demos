using DeliveryConfirmation.Shared.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeliveryConfirmation.Common.Enums;

namespace DeliveryConfirmation.Shared.Entities
{
    public class DeliveryDbInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<DeliveryDbContext>
    {
        protected override void Seed(DeliveryDbContext context)
        {
            var trucks = new List<Truck>
            {
            new Truck { TruckModel="BMW", TruckNumber="BM12345YA" },
            new Truck { TruckModel="ASC", TruckNumber="AS12345YA" },
            new Truck { TruckModel="Toyota", TruckNumber="To12345YA" },
            new Truck { TruckModel="Nissan", TruckNumber="Ni12345YA" },
            new Truck { TruckModel="Renault", TruckNumber="Re12345YA" },
            new Truck { TruckModel="Volvo", TruckNumber="VO12345YA" },
            };

            trucks.ForEach(s => context.Trucks.Add(s));
            context.SaveChanges();

            var random = new Random();
            var shipments = new List<Shipment>
            {
                new Shipment{ OriginName = "Ben Johnson", OriginAddress = "508 Rue de la, Gauchetière E, Montréal, QC H2L 4W4, Canada",
                    DestinationName = "Yohanson Cold", DestinationAddress = "1242 Rue de la Visitation, Montréal, QC H2L 3B4, Canada",
                    Delivered = false, Status = ShipmentStatuses.OutForDelivery, Truck = trucks[random.Next(0,trucks.Count-1)] },
                new Shipment{ OriginName = "Ben Verhan", OriginAddress = "508 Rue de la, Gauchetière E, Montréal, QC H2L 4W4, Canada",
                    DestinationName = "Yohanson Warms", DestinationAddress = "1242 Rue de la Visitation, Montréal, QC H2L 3B4, Canada",
                    Delivered = false, Status = ShipmentStatuses.OnTruck, Truck = trucks[random.Next(0,trucks.Count-1)] },
                new Shipment{ OriginName = "Yorg Johnson", OriginAddress = "508 Rue de la, Gauchetière E, Montréal, QC H2L 4W4, Canada",
                    DestinationName = "Chris Rea", DestinationAddress = "1242 Rue de la Visitation, Montréal, QC H2L 3B4, Canada",
                    Delivered = false, Status = ShipmentStatuses.OutForDelivery, Truck = trucks[random.Next(0,trucks.Count-1)] },
                new Shipment{ OriginName = "Ronald Bears", OriginAddress = "508 Rue de la, Gauchetière E, Montréal, QC H2L 4W4, Canada",
                    DestinationName = "Kaz Raz", DestinationAddress = "102 Rue Selkirk, Hudson, QC J0P 1H0, Canada",
                    Delivered = true, DeliveredDate = new DateTime(2020,09,08, 14, 00, 00), Status = ShipmentStatuses.OutForDelivery, Truck = trucks[random.Next(0,trucks.Count-1)] },
                new Shipment{ OriginName = "Guy Richy", OriginAddress = "102 Rue Selkirk, Hudson, QC J0P 1H0, Canada",
                    DestinationName = "Theresa Rich", DestinationAddress = "1242 Rue de la Visitation, Montréal, QC H2L 3B4, Canada",
                    Delivered = false, Status = ShipmentStatuses.OutForDelivery, Truck = trucks[random.Next(0,trucks.Count-1)] },
            };

            for (int i = 0; i < 99; i++)
            {
                var vi = "v" + i.ToString();
                random = new Random(DateTime.Now.Second);
                shipments.ForEach(s => shipments.Add(new Shipment()
                {
                    OriginName = s.OriginName + vi,
                    OriginAddress = s.OriginAddress,
                    DestinationName = s.DestinationName + vi,
                    DestinationAddress = s.DestinationAddress,
                    Delivered = s.Delivered,
                    DeliveredDate = s.DeliveredDate,
                    PackagesNumber = random.Next(1, 99),
                    Status = s.Status

                }));
            }

            shipments.ForEach(s => context.Shipments.Add(s));
            context.SaveChanges();
        }
    }
}
