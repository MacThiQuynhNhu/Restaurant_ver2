namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DanhSachGoiMonTruoc")]
    public partial class DanhSachGoiMonTruoc
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DanhSachGoiMonTruoc()
        {
            DSGMTruoc_MonAn = new HashSet<DSGMTruoc_MonAn>();
        }

        [Key]
        [StringLength(10)]
        public string MaGoiMonTruoc { get; set; }

        public string GhiChu { get; set; }

        public bool? TinhTrang { get; set; }

        [StringLength(10)]
        public string MaBanDatTruoc { get; set; }

        public bool? TonTai { get; set; }

        public virtual BanDatTruoc BanDatTruoc { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DSGMTruoc_MonAn> DSGMTruoc_MonAn { get; set; }
    }
}
