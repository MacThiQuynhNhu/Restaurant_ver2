namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MonAn")]
    public partial class MonAn
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MonAn()
        {
            DSGM_MonAn = new HashSet<DSGM_MonAn>();
            DSGMTruoc_MonAn = new HashSet<DSGMTruoc_MonAn>();
        }

        [Key]
        [StringLength(10)]
        public string MaMonAn { get; set; }

        public string TenMonAn { get; set; }

        public int? Gia { get; set; }

        [StringLength(20)]
        public string DonViTinh { get; set; }

        public string MoTa { get; set; }

        public string HinhAnh { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ThoiGianRaMat { get; set; }

        [StringLength(10)]
        public string MaLoaiMon { get; set; }

        public bool? TonTai { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DSGM_MonAn> DSGM_MonAn { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DSGMTruoc_MonAn> DSGMTruoc_MonAn { get; set; }

        public virtual LoaiMon LoaiMon { get; set; }
    }
}
