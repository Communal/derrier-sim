"use client";

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SIMPurchaseFormValues, useSIMPurchaseForm } from '@/hooks/use-sim-purchase-form';
import { SIMData } from '@/types/sim-purchase';
import { cn } from "@/lib/utils";
import { Globe, ChevronDown, User, Mail, Phone, MessageCircle, Package } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

// --- Form Input Sub-Component ---
interface FormInputProps {
    form: UseFormReturn<SIMPurchaseFormValues>;
    name: keyof SIMPurchaseFormValues;
    placeholder: string;
    type?: string;
    icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ form, name, placeholder, type = 'text', icon }) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <div className="relative flex items-center">
                        {icon && (
                            <div className="absolute left-4 text-neutral-500">
                                {icon}
                            </div>
                        )}
                        <Input
                            placeholder={placeholder}
                            type={type}
                            {...field}
                            className={cn(
                                "bg-[#FFFFFF0D] border-[0.8px] border-[#FFFFFF1A] focus:bg-[#FFFFFF1A] focus:border-white focus:ring-1 focus:ring-white text-white font-body font-normal text-[16px] leading-none h-14 rounded-xl placeholder:text-neutral-500 transition-colors",
                                icon ? "pl-12" : "pl-4"
                            )}
                        />
                    </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1 ml-1" />
            </FormItem>
        )}
    />
);

interface SIMPurchaseCardProps {
    data: SIMData;
    onSuccess?: (orderId: string, amount: number) => void;
}

const SIMPurchaseCard: React.FC<SIMPurchaseCardProps> = ({ data, onSuccess }) => {
    const { provider, title, description, shippingCost = 0 } = data;

    const { form, selectedPlanIndex, handlePlanChange, purchaseSummary, isSubmitting, submitError, onSubmit } = useSIMPurchaseForm(data, onSuccess);

    const selectedPlan = data.plans[selectedPlanIndex];

    return (
        <Card className="w-full bg-black border-none text-neutral-300">
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-12">

                    {/* Header Section */}
                    <CardHeader className="text-left space-y-4 p-0 md:p-6">
                        <CardTitle className="font-heading text-3xl md:text-4xl font-light text-white">
                            Get Your {title}
                        </CardTitle>
                        <CardDescription className="text-sm md:text-base font-body text-neutral-400 max-w-2xl leading-relaxed">
                            {description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-12 p-0 md:p-6">
                        {/* 1. SIM Card Plan Selection */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                    SIM CARD BRAND
                                </Label>
                                <div className="flex items-center justify-between p-4 rounded-xl border-[0.8px] border-[#FFFFFF1A] bg-[#FFFFFF0D]">
                                    <div className="flex items-center gap-3 text-white">
                                        <Globe className="w-5 h-5 text-neutral-400" />
                                        <span className="font-medium font-body text-[16px]">{provider}</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                                </div>
                            </div>

                            {/* Plans Selection Grid */}
                            <RadioGroup value={String(selectedPlanIndex)} onValueChange={(v) => handlePlanChange(parseInt(v))} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.plans.map((plan, index) => (
                                    <label
                                        key={index}
                                        htmlFor={`${data.id}-plan-${index}`} // Unique ID
                                        className={cn(
                                            "relative flex flex-col justify-center p-5 rounded-2xl border-[0.8px] border-[#FFFFFF1A] transition-all cursor-pointer hover:bg-[#FFFFFF1A]",
                                            selectedPlanIndex === index ? "bg-[#FFFFFF1A]" : "bg-[#FFFFFF0D]"
                                        )}>
                                        <div className="flex justify-between items-center w-full mb-2">
                                            <span className="text-[16px] font-heading font-medium text-white">
                                                {provider}
                                            </span>
                                            <RadioGroupItem
                                                value={String(index)}
                                                id={`${data.id}-plan-${index}`} // Unique ID
                                                className={cn(
                                                    "h-5 w-5 rounded-full",
                                                    selectedPlanIndex === index ? "border-white text-white" : "border-neutral-500"
                                                )}
                                            />
                                        </div>
                                        <p className="text-2xl md:text-3xl font-body font-light text-white flex items-baseline gap-1">
                                            ₦{plan.price.toLocaleString()}
                                            <span className="text-sm font-normal text-neutral-500">/ {plan.description}</span>
                                        </p>
                                    </label>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* 2. User Information Form */}
                        <div className="space-y-6">
                            <Label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                FILL THE FORM TO PLACE AN ORDER
                            </Label>

                            <div className="space-y-4">
                                <FormInput form={form} name="fullName" placeholder="Full Name" icon={<User className="w-5 h-5" />} />
                                <FormInput form={form} name="emailAddress" placeholder="Email Address" type="email" icon={<Mail className="w-5 h-5" />} />
                                <FormInput form={form} name="phoneNumber" placeholder="Phone Number" icon={<Phone className="w-5 h-5" />} />
                                <FormInput form={form} name="whatsappNumber" placeholder="Whatsapp Number" icon={<MessageCircle className="w-5 h-5" />} />
                                <FormInput form={form} name="shippingAddress" placeholder="Delivery Address" icon={<Package className="w-5 h-5" />} />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-[#FFFFFF0D] border-[0.8px] border-[#FFFFFF1A] hover:bg-[#FFFFFF1A] focus:bg-[#FFFFFF1A] text-neutral-500 font-body text-[16px] h-14 rounded-xl px-4 focus:ring-1 focus:ring-white transition-colors">
                                                            <SelectValue placeholder="State" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-neutral-900 border-[#FFFFFF1A] text-white">
                                                        <SelectItem value="Lagos">Lagos</SelectItem>
                                                        <SelectItem value="Abuja">Abuja</SelectItem>
                                                        <SelectItem value="Rivers">Rivers</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 text-xs ml-1" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lga"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-[#FFFFFF0D] border-[0.8px] border-[#FFFFFF1A] hover:bg-[#FFFFFF1A] focus:bg-[#FFFFFF1A] text-neutral-500 font-body text-[16px] h-14 rounded-xl px-4 focus:ring-1 focus:ring-white transition-colors">
                                                            <SelectValue placeholder="LGA" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-neutral-900 border-[#FFFFFF1A] text-white">
                                                        <SelectItem value="Ikeja">Ikeja</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 text-xs ml-1" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Pricing Summary & Submission */}
                        <div className="space-y-6">
                            <div className="bg-[#FFFFFF0D] p-6 rounded-2xl border-[0.8px] border-[#FFFFFF1A] space-y-4">
                                <div className="space-y-3 font-body text-neutral-400">
                                    <div className="flex justify-between items-center text-sm">
                                        {/* Dynamically reads the selected pieces */}
                                        <span>Subtotal ({selectedPlan.description} SIM Card)</span>
                                        <span className="text-white">₦{purchaseSummary.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Shipping</span>
                                        <span className="text-white">{purchaseSummary.shipping === 0 ? "Free" : `₦${purchaseSummary.shipping.toLocaleString()}`}</span>
                                    </div>
                                </div>
                                <Separator className="bg-[#FFFFFF1A]" />
                                <div className="flex justify-between items-center text-lg font-bold font-body text-white pt-1">
                                    <span>Total</span>
                                    <span>₦{purchaseSummary.total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Validation Error Alert */}
                            {Object.keys(form.formState.errors).length > 0 && (
                                <Alert variant="destructive" className="bg-red-950/50 border-red-900">
                                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                                    <AlertTitle className="text-red-500">Error</AlertTitle>
                                    <AlertDescription className="text-red-400">
                                        Please fill in all required fields correctly.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Submit Button grouped closely with the summary */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white hover:bg-neutral-200 text-black font-body font-medium h-14 text-[16px] rounded-xl transition-colors"
                            >
                                {isSubmitting ? "Processing Order..." : "Complete Purchase"}
                            </Button>

                            {submitError && (
                                <p className="text-red-500 text-sm text-center mt-2 font-body">{submitError}</p>
                            )}
                        </div>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};

export default SIMPurchaseCard;