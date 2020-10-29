using System.Collections.Generic;

namespace DeliveryConfirmation.Shared.Response
{
    public class PagedResponse<T>
    {
        public int Page { get; set; }
        public int TotalRecords { get; set; }

        public IEnumerable<T> Records { get; set; }

        public static PagedResponse<T> Of(IEnumerable<T> records, int page, int total)
        {
            return new PagedResponse<T>()
            {
                TotalRecords = total,
                Page = page,
                Records = records
            };
        }
    }
}