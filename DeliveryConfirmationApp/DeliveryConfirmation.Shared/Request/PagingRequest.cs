using System.Runtime.Serialization;

namespace DeliveryConfirmation.Shared.Request
{
    [DataContract]
    public class PagingRequest
    {
        [DataMember]
        public int Page { get; set; }

        [DataMember]
        public int PageSize { get; set; }

        public static PagingRequest Default()
        {
            return new PagingRequest()
            {
                Page = 1,
                PageSize = 25
            };
        }

        public static PagingRequest Of(int page, int size)
        {
            return new PagingRequest()
            {
                Page = page,
                PageSize = size
            };
        }
    }
}
