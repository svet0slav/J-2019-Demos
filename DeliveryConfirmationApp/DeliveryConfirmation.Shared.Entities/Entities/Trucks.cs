using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace DeliveryConfirmation.Shared.Entities.Entities
{
    public partial class Truck
    {
        public Truck()
        {
            Shipments = new HashSet<Shipment>();
            CreationDate = DateTime.Now;
            ModifiedDate = DateTime.Now;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TruckId { get; set; }
        public string TruckNumber { get; set; }
        public string TruckModel { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        
        public virtual ICollection<Shipment> Shipments { get; set; }
        
    }
}