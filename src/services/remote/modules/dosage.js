// import axiosClient from '../base_api_class';

// class DosageRemoteService {
//   constructor() {
//     this.apiRoutes = {
//       createPeptideDosage: "/peptide-dosage/create",
//       updatePeptideDosage: (id) => `/peptide-dosage/update/${id}`,
//       deletePeptideDosage: (id) => `/peptide-dosage/delete/${id}`,
//     };
//   }

//   async createPeptideDosage(data) {
//     try {
//       const response = await axiosClient.post(this.apiRoutes.createPeptideDosage, data);
//       return response.data;
//     } catch (error) {
//       console.error("Create Dosage Error:", error);
//       throw error;
//     }
//   }

//   async updatePeptideDosage(id, data) {
//     try {
//       const response = await axiosClient.put(this.apiRoutes.updatePeptideDosage(id), data);
//       return response.data;
//     } catch (error) {
//       console.error("Update Dosage Error:", error);
//       throw error;
//     }
//   }

//   async deletePeptideDosage(id) {
//     try {
//       const response = await axiosClient.delete(this.apiRoutes.deletePeptideDosage(id));
//       return response.data;
//     } catch (error) {
//       console.error("Delete Dosage Error:", error);
//       throw error;
//     }
//   }
// }

// export default new DosageRemoteService(); // ✅ Correct

import { get } from 'http';
import axiosClient from '../base_api_class';

class DosageRemoteService {
  constructor() {
    this.apiRoutes = {
      getPeptideDosageByDate: "/peptide-dosage/getByDate",
      createPeptideDosage: "/peptide-dosage/create",
      updatePeptideDosage: (id) => `/peptide-dosage/update/${id}`,
      deletePeptideDosage: (id) => `/peptide-dosage/delete/${id}`,
    };
  }

async getPeptideDosageByDate(date) {
  try {
    const response = await axiosClient.get( this.apiRoutes.getPeptideDosageByDate , {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error("Get Dosage By Date Error:", error);
    throw error;
  }
}




  async createPeptideDosage(data) {
    try {
      const response = await axiosClient.post(this.apiRoutes.createPeptideDosage, data);
      return response.data;
    } catch (error) {
      console.error("Create Dosage Error:", error);
      throw error;
    }
  }

  async updatePeptideDosage(id, data) {
    try {
      const response = await axiosClient.put(this.apiRoutes.updatePeptideDosage(id), data);
      return response.data;
    } catch (error) {
      console.error("Update Dosage Error:", error);
      throw error;
    }
  }

  async deletePeptideDosage(id) {
    try {
      const response = await axiosClient.delete(this.apiRoutes.deletePeptideDosage(id));
      return response.data;
    } catch (error) {
      console.error("Delete Dosage Error:", error);
      throw error;
    }
  }
}

export default new DosageRemoteService(); // ✅ Correct
