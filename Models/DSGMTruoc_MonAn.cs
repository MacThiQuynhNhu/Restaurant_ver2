namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class DSGMTruoc_MonAn
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string MaGoiMonTruoc { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(10)]
        public string MaMonAn { get; set; }

        public int? SoLuong { get; set; }

        public bool? TinhTrang { get; set; }

        public bool? TonTai { get; set; }

        public virtual DanhSachGoiMonTruoc DanhSachGoiMonTruoc { get; set; }

        public virtual MonAn MonAn { get; set; }
    }
}
