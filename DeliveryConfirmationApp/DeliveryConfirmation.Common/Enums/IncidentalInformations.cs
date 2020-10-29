using System.ComponentModel;

namespace DeliveryConfirmation.Common.Enums
{
    public enum IncidentalInformations
    {
        None = 0,

        [Description("Customer was home")]
        CustomerWasHome = 11,

        [Description("Customer was not home")]
        CustomerWasNotHome = 12,

        [Description("Package left by door")]
        PackageLeftByDoor = 21,

        [Description("Relative took package")]
        RelativeTookPackage = 31,

        [Description("Custom")]
        Custom = 999,
    }
}
