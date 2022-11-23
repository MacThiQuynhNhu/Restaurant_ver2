using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Restaurant.Models.Function
{
    public class DauBepF
    {
        private Model1 context;

        public DauBepF()
        {
            context = new Model1();
        }

        public IQueryable<DauBep> DSDauBep
        {
            get { return context.DauBeps; }
        }

        // Trả về một đối tượng danh mục, khi biết Khóa
        public DauBep FindEntity(string MaDauBep)
        {
            DauBep dbEntry = context.DauBeps.Find(MaDauBep);
            return dbEntry;
        }

        // Thêm một đối tượng
        public bool Insert(DauBep model)
        {
            DauBep dbEntry = context.DauBeps.Find(model.MaDauBep);

            if (dbEntry != null)
            {
                return false;

            }
            context.DauBeps.Add(model);

            context.SaveChanges();

            return true;
        }
    }
}