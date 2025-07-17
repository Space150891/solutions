import {
   Box,
   Typography,
   Button,
   Stack,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Grid,
   Card,
   CardContent,
   Chip,
   TextField,
   Autocomplete,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableContainer,
   Paper,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DiagnosisCode, ReportFilters } from '../../../store/slices/types/patientHistoryTypes';

export default function ReportsTab() {
   const [reportType, setReportType] = useState<'diagnosis' | 'treatment' | 'combined'>('diagnosis');
   const [startDate, setStartDate] = useState<Date | null>(null);
   const [endDate, setEndDate] = useState<Date | null>(null);
   const [selectedCodes, setSelectedCodes] = useState<DiagnosisCode[]>([]);
   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
   const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
   const [showFilters, setShowFilters] = useState(false);
   
   const diagnosisCodes = useAppSelector((state) => state.patientHistory.diagnosisCodes);
   const diagnoses = useAppSelector((state) => state.patientHistory.diagnosis);
   const treatments = useAppSelector((state) => state.patientHistory.treatmentDetails);
   
   // Extract unique providers from diagnoses and treatments
   const uniqueProviders = useMemo(() => {
      const diagnosisProviders = diagnoses
         .filter(d => d.treatingProvider)
         .map(d => d.treatingProvider as string);
      
      const treatmentProviders = treatments.map(t => t.provider);
      
      return Array.from(new Set([...diagnosisProviders, ...treatmentProviders]))
         .filter(Boolean)
         .sort();
   }, [diagnoses, treatments]);
   
   // Extract unique statuses based on report type
   const uniqueStatuses = useMemo(() => {
      if (reportType === 'diagnosis') {
         return Array.from(
            new Set(diagnoses.map(d => d.status || 'active'))
         ).sort();
      } else {
         return Array.from(
            new Set(treatments.map(t => t.status))
         ).sort();
      }
   }, [reportType, diagnoses, treatments]);
   
   // Filter data based on selected filters
   const filteredData = useMemo(() => {
      let diagnosisResults = [...diagnoses];
      let treatmentResults = [...treatments];
      
      // Filter by date range
      if (startDate) {
         const startTimestamp = startDate.getTime();
         diagnosisResults = diagnosisResults.filter(d => 
            new Date(d.date).getTime() >= startTimestamp
         );
         
         treatmentResults = treatmentResults.filter(t => 
            new Date(t.startDate).getTime() >= startTimestamp
         );
      }
      
      if (endDate) {
         const endTimestamp = endDate.getTime();
         diagnosisResults = diagnosisResults.filter(d => 
            new Date(d.date).getTime() <= endTimestamp
         );
         
         treatmentResults = treatmentResults.filter(t => 
            !t.endDate || new Date(t.endDate).getTime() <= endTimestamp
         );
      }
      
      // Filter by diagnosis codes
      if (selectedCodes.length > 0) {
         const codeValues = selectedCodes.map(c => c.code);
         diagnosisResults = diagnosisResults.filter(d => 
            codeValues.includes(String(d.code))
         );
         
         // For treatments, filter by related diagnosis
         const filteredDiagnosisIds = diagnosisResults.map(d => d.id);
         treatmentResults = treatmentResults.filter(t => 
            filteredDiagnosisIds.includes(t.diagnosisId)
         );
      }
      
      // Filter by status
      if (selectedStatuses.length > 0) {
         if (reportType === 'diagnosis' || reportType === 'combined') {
            diagnosisResults = diagnosisResults.filter(d => 
               selectedStatuses.includes(d.status || 'active')
            );
         }
         
         if (reportType === 'treatment' || reportType === 'combined') {
            treatmentResults = treatmentResults.filter(t => 
               selectedStatuses.includes(t.status)
            );
         }
      }
      
      // Filter by provider
      if (selectedProviders.length > 0) {
         diagnosisResults = diagnosisResults.filter(d => 
            d.treatingProvider && selectedProviders.includes(d.treatingProvider)
         );
         
         treatmentResults = treatmentResults.filter(t => 
            selectedProviders.includes(t.provider)
         );
      }
      
      return { diagnosisResults, treatmentResults };
   }, [
      reportType,
      diagnoses,
      treatments,
      startDate,
      endDate,
      selectedCodes,
      selectedStatuses,
      selectedProviders
   ]);
   
   const handleExport = () => {
      // Generate report data
      const reportData = {
         type: reportType,
         filters: {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
            diagnosisCodes: selectedCodes.map(c => c.code),
            statuses: selectedStatuses,
            providers: selectedProviders
         },
         data: reportType === 'diagnosis' 
            ? filteredData.diagnosisResults 
            : reportType === 'treatment'
               ? filteredData.treatmentResults
               : { diagnoses: filteredData.diagnosisResults, treatments: filteredData.treatmentResults }
      };
      
      // Convert to JSON and create download link
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `patient_${reportType}_report_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
   };
   
   const handlePrint = () => {
      window.print();
   };
   
   const renderDiagnosisReport = () => (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ICD Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {filteredData.diagnosisResults.map((diag) => (
                  <TableRow key={diag.id}>
                     <TableCell>{diag.code}</TableCell>
                     <TableCell>
                        <Typography variant="body2" fontWeight="medium">{diag.title}</Typography>
                        {diag.description && (
                           <Typography variant="caption" color="text.secondary">{diag.description}</Typography>
                        )}
                     </TableCell>
                     <TableCell>
                        <Chip 
                           label={diag.status || 'active'} 
                           size="small"
                           color={diag.status === 'resolved' ? 'success' : 'primary'}
                        />
                     </TableCell>
                     <TableCell>
                        <Chip 
                           label={diag.severity || 'medium'} 
                           size="small"
                           color={
                              diag.severity === 'high' ? 'error' :
                              diag.severity === 'medium' ? 'warning' :
                              diag.severity === 'low' ? 'success' : 'default'
                           }
                        />
                     </TableCell>
                     <TableCell>{diag.treatingProvider || 'Not assigned'}</TableCell>
                     <TableCell>{new Date(diag.date).toLocaleDateString()}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
   
   const renderTreatmentReport = () => (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Related Diagnosis</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Effectiveness</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date Range</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {filteredData.treatmentResults.map((treatment) => {
                  const relatedDiagnosis = diagnoses.find(d => d.id === treatment.diagnosisId);
                  
                  return (
                     <TableRow key={treatment.id}>
                        <TableCell>
                           <Typography variant="body2" fontWeight="medium">{treatment.name}</Typography>
                           {treatment.description && (
                              <Typography variant="caption" color="text.secondary">{treatment.description}</Typography>
                           )}
                        </TableCell>
                        <TableCell>{relatedDiagnosis?.title || 'Unknown'}</TableCell>
                        <TableCell>
                           <Chip 
                              label={treatment.status} 
                              size="small"
                              color={
                                 treatment.status === 'planned' ? 'info' :
                                 treatment.status === 'in-progress' ? 'warning' :
                                 treatment.status === 'completed' ? 'success' :
                                 treatment.status === 'discontinued' ? 'error' : 'default'
                              }
                           />
                        </TableCell>
                        <TableCell>
                           {treatment.effectiveness ? (
                              <Chip 
                                 label={treatment.effectiveness} 
                                 size="small"
                                 color={
                                    treatment.effectiveness === 'excellent' ? 'success' :
                                    treatment.effectiveness === 'good' ? 'info' :
                                    treatment.effectiveness === 'fair' ? 'warning' :
                                    treatment.effectiveness === 'poor' ? 'error' : 'default'
                                 }
                              />
                           ) : (
                              <Typography variant="caption" color="text.secondary">Not evaluated</Typography>
                           )}
                        </TableCell>
                        <TableCell>{treatment.provider}</TableCell>
                        <TableCell>
                           {new Date(treatment.startDate).toLocaleDateString()}
                           {treatment.endDate && ` - ${new Date(treatment.endDate).toLocaleDateString()}`}
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </TableContainer>
   );
   
   const renderCombinedReport = () => (
      <Box>
         <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Diagnosis Summary</Typography>
         {renderDiagnosisReport()}
         
         <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Treatment Summary</Typography>
         {renderTreatmentReport()}
      </Box>
   );
   
   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Patient Reports
         </Typography>
         
         <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
               <Card>
                  <CardContent>
                     <Typography variant="subtitle1" gutterBottom>Report Configuration</Typography>
                     
                     <Stack spacing={2}>
                        <FormControl fullWidth>
                           <InputLabel>Report Type</InputLabel>
                           <Select
                              value={reportType}
                              label="Report Type"
                              onChange={(e) => setReportType(e.target.value as 'diagnosis' | 'treatment' | 'combined')}
                           >
                              <MenuItem value="diagnosis">Diagnosis Report</MenuItem>
                              <MenuItem value="treatment">Treatment Report</MenuItem>
                              <MenuItem value="combined">Combined Report</MenuItem>
                           </Select>
                        </FormControl>
                        
                        <Button 
                           startIcon={<FilterAltIcon />}
                           onClick={() => setShowFilters(!showFilters)}
                           variant="outlined"
                        >
                           {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                        
                        {showFilters && (
                           <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                              <Typography variant="subtitle2" gutterBottom>Filters</Typography>
                              <Stack spacing={2}>
                                 <Stack direction="row" spacing={2}>
                                    <TextField
                                       label="Start Date"
                                       type="date"
                                       value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                       onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                                       fullWidth
                                       size="small"
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                    />
                                    <TextField
                                       label="End Date"
                                       type="date"
                                       value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                       onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                                       fullWidth
                                       size="small"
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                    />
                                 </Stack>
                                 
                                 <Autocomplete
                                    multiple
                                    options={diagnosisCodes}
                                    getOptionLabel={(option) => `${option.code} - ${option.description}`}
                                    value={selectedCodes}
                                    onChange={(_, newValue) => setSelectedCodes(newValue)}
                                    renderInput={(params) => (
                                       <TextField 
                                          {...params} 
                                          label="Diagnosis Codes" 
                                          size="small"
                                       />
                                    )}
                                 />
                                 
                                 <Autocomplete
                                    multiple
                                    options={uniqueStatuses}
                                    value={selectedStatuses}
                                    onChange={(_, newValue) => setSelectedStatuses(newValue)}
                                    renderInput={(params) => (
                                       <TextField 
                                          {...params} 
                                          label="Status" 
                                          size="small"
                                       />
                                    )}
                                 />
                                 
                                 <Autocomplete
                                    multiple
                                    options={uniqueProviders}
                                    value={selectedProviders}
                                    onChange={(_, newValue) => setSelectedProviders(newValue)}
                                    renderInput={(params) => (
                                       <TextField 
                                          {...params} 
                                          label="Providers" 
                                          size="small"
                                       />
                                    )}
                                 />
                              </Stack>
                           </Box>
                        )}
                        
                        <Stack direction="row" spacing={1}>
                           <Button 
                              variant="contained" 
                              startIcon={<FileDownloadIcon />}
                              onClick={handleExport}
                           >
                              Export Report
                           </Button>
                           <Button 
                              variant="outlined" 
                              startIcon={<PrintIcon />}
                              onClick={handlePrint}
                           >
                              Print Report
                           </Button>
                        </Stack>
                     </Stack>
                  </CardContent>
               </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
               <Card>
                  <CardContent>
                     <Typography variant="subtitle1" gutterBottom>Report Summary</Typography>
                     
                     <Stack spacing={1}>
                        <Typography variant="body2">
                           <strong>Total Diagnoses:</strong> {filteredData.diagnosisResults.length}
                        </Typography>
                        <Typography variant="body2">
                           <strong>Total Treatments:</strong> {filteredData.treatmentResults.length}
                        </Typography>
                        {startDate && (
                           <Typography variant="body2">
                              <strong>Date Range:</strong> {startDate.toLocaleDateString()} 
                              {endDate ? ` to ${endDate.toLocaleDateString()}` : ' onwards'}
                           </Typography>
                        )}
                        {selectedCodes.length > 0 && (
                           <Typography variant="body2">
                              <strong>Filtered by:</strong> {selectedCodes.length} diagnosis codes
                           </Typography>
                        )}
                     </Stack>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
         
         <Box sx={{ mt: 3 }} className="report-content">
            {reportType === 'diagnosis' && renderDiagnosisReport()}
            {reportType === 'treatment' && renderTreatmentReport()}
            {reportType === 'combined' && renderCombinedReport()}
         </Box>
      </Box>
   );
} 