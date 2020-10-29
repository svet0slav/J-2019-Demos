using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
//using DeliveryConfirmation.Shared.Entities.CodeFirst;

namespace DeliveryConfirmation.Shared.Entities
{
    public interface IConfiguration
    {
        //TODO: replace
    }

    public class ContextFactory //TODO: IDesignTimeDbContextFactory<DeliveryDbContext>
    {
        private const string CONNECTION_STRING = "DeliveryConfirmationContext";
        private IConfiguration _config;

        public ContextFactory()
        {

        }

        public ContextFactory(IConfiguration config)
        {
            _config = config;
        }
        public DeliveryDbContext CreateDbContext()
        {
            //var opt = new DbContextOptionsBuilder<DeliveryDbContext>()
            //    .UseSqlServer(_config[CONNECTION_STRING])
            //    .UseLoggerFactory(_logger)
            //    .EnableSensitiveDataLogging(true)
            //    .EnableDetailedErrors(true);

            return new DeliveryDbContext(); //opt.Options
        }

        public DeliveryDbContext CreateDbContext(Guid initiator)
        {
            //var opt = new DbContextOptionsBuilder<DeliveryDbContext>()
            //    .UseSqlServer(_config[CONNECTION_STRING])
            //    .UseLoggerFactory(_logger)
            //    .EnableSensitiveDataLogging(true)
            //    .EnableDetailedErrors(true);

            return new DeliveryDbContext(); // (opt.Options);
        }

        public DeliveryDbContext CreateDbContext(string[] args)
        {
            //TODO
            //var configuration = new ConfigurationBuilder()
            //    .AddJsonFile("appsettings.json")
            //    .Build();

            //var opt = new DbContextOptionsBuilder<ScaffoldDbContext>()
            //    .UseSqlServer(configuration[CONNECTION_STRING])
            //    .EnableSensitiveDataLogging(true)
            //    .EnableDetailedErrors(true);

            return new DeliveryDbContext(); // (opt.Options);
        }

        public DeliveryDbContext CreateReadonlyDbContext()
        {
            //var opt = new DbContextOptionsBuilder<ScaffoldDbContext>()
            //    .UseSqlServer(_config[CONNECTION_STRING])
            //    .UseLoggerFactory(_logger)
            //    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
            //    .EnableSensitiveDataLogging(true)
            //    .EnableDetailedErrors(true);

            return new DeliveryDbContext(); // (opt.Options);
        }

    }

}