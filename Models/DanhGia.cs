namespace Restaurant.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DanhGia")]
    public partial class DanhGia
    {
        [Key]
        [StringLength(10)]
        public string MaDanhGia { get; set; }

        public int? SoSao { get; set; }

        public string BinhLuan { get; set; }

        public DateTime? ThoiGian { get; set; }

        [StringLength(10)]
        public string MaGoiMon { get; set; }

        public bool? TonTai { get; set; }

        public virtual DanhSachGoiMon DanhSachGoiMon { get; set; }
    }
}
