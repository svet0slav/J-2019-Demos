using AutoMapper;
using DeliveryConfirmation.Business.BO.Contract;
using DeliveryConfirmation.Common.Enums;
using DeliveryConfirmation.Shared.Dto;
using DeliveryConfirmation.Shared.Request;
using DeliveryConfirmation.Shared.Response;
using DeliveryConfirmation.Shared.Service;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DeliveryConfirmation.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class DeliveryConfirmationService : IDeliveryConfirmationService
    {
        private readonly ITrucksBO _trucksBO;
        private readonly IShipmentsBO _shipmentsBO;
        private readonly IMapper _mapper;

        public DeliveryConfirmationService(
            //TODO: ILogger<DeliveryConfirmationService> logger,
            IMapper mapper,
            ITrucksBO trucksBO,
            IShipmentsBO shipmentsBO
            )
        {
            //TODO: _logger = logger;
            _mapper = mapper;
            _trucksBO = trucksBO;
            _shipmentsBO = shipmentsBO;
        }

        public async Task<PagedResponse<ShipmentDto>> GetShipments(int truckId, PagingRequest paging)
        {
            if (truckId == 0)
            {
                throw new ArgumentNullException("TruckId is invalid");
            }

            var res = await _shipmentsBO.GetByTruck(truckId, paging: paging);

            var dtos = _mapper.Map<List<ShipmentDto>>(res.Records);
            return PagedResponse<ShipmentDto>.Of(dtos, paging == null ? 1 : paging.Page, res.TotalRecords);
        }

        public async Task<PagedResponse<TruckDto>> GetTrucks(PagingRequest paging = null)
        {
            var res = await _trucksBO.GetAll(paging: paging);

            var dtos = _mapper.Map<List<TruckDto>>(res.Records);
            return PagedResponse<TruckDto>.Of(dtos, paging == null ? 1 : paging.Page, res.TotalRecords);
        }

        public async Task<ShipmentDto> UpdateShipmentDelivered(int shipmentId)
        {
            var newStatus = ShipmentStatuses.Delivered;
            await _shipmentsBO.UpdateStatus(shipmentId, newStatus);

            var res = await _shipmentsBO.GetShipmentById(shipmentId);
            var dto = _mapper.Map<ShipmentDto>(res);
            return dto;
        }

        public async Task<ShipmentDto> UpdateShipmentHeldOnTruck(int shipmentId)
        {
            var newStatus = ShipmentStatuses.OnTruck;
            await _shipmentsBO.UpdateStatus(shipmentId, newStatus);

            var res = _shipmentsBO.GetShipmentById(shipmentId);
            var dto = _mapper.Map<ShipmentDto>(res);
            return dto;
        }
    }
}