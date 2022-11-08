using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Restaurant.Models
{
    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=Model1")
        {
        }

        public virtual DbSet<BaiViet> BaiViets { get; set; }
        public virtual DbSet<Ban> Bans { get; set; }
        public virtual DbSet<BanDatTruoc> BanDatTruocs { get; set; }
        public virtual DbSet<DanhGia> DanhGias { get; set; }
        public virtual DbSet<DanhSachGoiMon> DanhSachGoiMons { get; set; }
        public virtual DbSet<DauBep> DauBeps { get; set; }
        public virtual DbSet<DSGM_MonAn> DSGM_MonAn { get; set; }
        public virtual DbSet<GoiTopping> GoiToppings { get; set; }
        public virtual DbSet<HoaDon> HoaDons { get; set; }
        public virtual DbSet<KhachHang> KhachHangs { get; set; }
        public virtual DbSet<KhuyenMai> KhuyenMais { get; set; }
        public virtual DbSet<LoaiMon> LoaiMons { get; set; }
        public virtual DbSet<LoaiTopping> LoaiToppings { get; set; }
        public virtual DbSet<MonAn> MonAns { get; set; }
        public virtual DbSet<MonAn_KhuyenMai> MonAn_KhuyenMai { get; set; }
        public virtual DbSet<NhanVien> NhanViens { get; set; }
        public virtual DbSet<NhomNguoiDung> NhomNguoiDungs { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<Topping> Toppings { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaiViet>()
                .Property(e => e.MaBaiViet)
                .IsUnicode(false);

            modelBuilder.Entity<Ban>()
                .Property(e => e.MaBan)
                .IsUnicode(false);

            modelBuilder.Entity<Ban>()
                .HasMany(e => e.BanDatTruocs)
                .WithRequired(e => e.Ban)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<BanDatTruoc>()
                .Property(e => e.MaKhachHang)
                .IsUnicode(false);

            modelBuilder.Entity<BanDatTruoc>()
                .Property(e => e.MaBan)
                .IsUnicode(false);

            modelBuilder.Entity<BanDatTruoc>()
                .Property(e => e.Gio)
                .HasPrecision(0);

            modelBuilder.Entity<BanDatTruoc>()
                .Property(e => e.MaNhanVien)
                .IsUnicode(false);

            modelBuilder.Entity<DanhGia>()
                .Property(e => e.MaDanhGia)
                .IsUnicode(false);

            modelBuilder.Entity<DanhGia>()
                .Property(e => e.MaGoiMon)
                .IsUnicode(false);

            modelBuilder.Entity<DanhGia>()
                .Property(e => e.MaKhachHang)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .Property(e => e.MaGoiMon)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .Property(e => e.MaKhachHang)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .Property(e => e.MaDanhGia)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .Property(e => e.MaHoaDon)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .Property(e => e.MaBan)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .Property(e => e.MaNhanVien)
                .IsUnicode(false);

            modelBuilder.Entity<DanhSachGoiMon>()
                .HasMany(e => e.DSGM_MonAn)
                .WithRequired(e => e.DanhSachGoiMon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DauBep>()
                .Property(e => e.MaDauBep)
                .IsUnicode(false);

            modelBuilder.Entity<DauBep>()
                .Property(e => e.SoDienThoai)
                .IsFixedLength();

            modelBuilder.Entity<DSGM_MonAn>()
                .Property(e => e.MaGoiMon)
                .IsUnicode(false);

            modelBuilder.Entity<DSGM_MonAn>()
                .Property(e => e.MaMonAn)
                .IsUnicode(false);

            modelBuilder.Entity<DSGM_MonAn>()
                .HasMany(e => e.GoiToppings)
                .WithRequired(e => e.DSGM_MonAn)
                .HasForeignKey(e => new { e.MaGoiMon, e.MaMonAn })
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<GoiTopping>()
                .Property(e => e.MaGoiMon)
                .IsUnicode(false);

            modelBuilder.Entity<GoiTopping>()
                .Property(e => e.MaMonAn)
                .IsUnicode(false);

            modelBuilder.Entity<GoiTopping>()
                .Property(e => e.MaTopping)
                .IsUnicode(false);

            modelBuilder.Entity<HoaDon>()
                .Property(e => e.MaHoaDon)
                .IsUnicode(false);

            modelBuilder.Entity<HoaDon>()
                .Property(e => e.MaNhanVien)
                .IsUnicode(false);

            modelBuilder.Entity<HoaDon>()
                .Property(e => e.MaGoiMon)
                .IsUnicode(false);

            modelBuilder.Entity<KhachHang>()
                .Property(e => e.MaKhachHang)
                .IsUnicode(false);

            modelBuilder.Entity<KhachHang>()
                .Property(e => e.SDT)
                .IsUnicode(false);

            modelBuilder.Entity<KhachHang>()
                .HasOptional(e => e.BanDatTruoc)
                .WithRequired(e => e.KhachHang);

            modelBuilder.Entity<KhuyenMai>()
                .Property(e => e.MaKhuyenMai)
                .IsUnicode(false);

            modelBuilder.Entity<KhuyenMai>()
                .HasMany(e => e.MonAn_KhuyenMai)
                .WithRequired(e => e.KhuyenMai)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LoaiMon>()
                .Property(e => e.MaLoaiMon)
                .IsUnicode(false);

            modelBuilder.Entity<LoaiTopping>()
                .Property(e => e.MaLoaiTopping)
                .IsUnicode(false);

            modelBuilder.Entity<MonAn>()
                .Property(e => e.MaMonAn)
                .IsUnicode(false);

            modelBuilder.Entity<MonAn>()
                .Property(e => e.MaLoaiMon)
                .IsUnicode(false);

            modelBuilder.Entity<MonAn>()
                .HasMany(e => e.DSGM_MonAn)
                .WithRequired(e => e.MonAn)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<MonAn>()
                .HasMany(e => e.MonAn_KhuyenMai)
                .WithRequired(e => e.MonAn)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<MonAn_KhuyenMai>()
                .Property(e => e.MaMonAn)
                .IsUnicode(false);

            modelBuilder.Entity<MonAn_KhuyenMai>()
                .Property(e => e.MaKhuyenMai)
                .IsUnicode(false);

            modelBuilder.Entity<NhanVien>()
                .Property(e => e.MaNhanVien)
                .IsUnicode(false);

            modelBuilder.Entity<NhanVien>()
                .Property(e => e.SoDienThoai)
                .IsFixedLength();

            modelBuilder.Entity<NhanVien>()
                .Property(e => e.TenDangNhap)
                .IsFixedLength();

            modelBuilder.Entity<NhanVien>()
                .Property(e => e.MatKhau)
                .IsFixedLength();

            modelBuilder.Entity<NhanVien>()
                .Property(e => e.MaNhom)
                .IsUnicode(false);

            modelBuilder.Entity<NhomNguoiDung>()
                .Property(e => e.MaNhom)
                .IsUnicode(false);

            modelBuilder.Entity<Topping>()
                .Property(e => e.MaTopping)
                .IsUnicode(false);

            modelBuilder.Entity<Topping>()
                .Property(e => e.MaMonAn)
                .IsUnicode(false);

            modelBuilder.Entity<Topping>()
                .Property(e => e.MaLoaiTopping)
                .IsUnicode(false);

            modelBuilder.Entity<Topping>()
                .HasMany(e => e.GoiToppings)
                .WithRequired(e => e.Topping)
                .WillCascadeOnDelete(false);
        }
    }
}
